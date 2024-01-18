using System.Text;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore;
using FleetManager.Models;
using FleetManager.Profiles;
using Microsoft.AspNetCore.Authorization;
using System.Threading.RateLimiting;
using Microsoft.Data.SqlClient;
using Microsoft.AspNetCore.Server.Kestrel.Https;
using System.Security.Cryptography.X509Certificates;
using Microsoft.AspNetCore.HttpOverrides;

namespace Back_end
{


    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Voeg SqlConnection toe aan de DI-container
            builder.Services.AddScoped<SqlConnection>(provider =>
            {
                return new SqlConnection(builder.Configuration.GetConnectionString("Default"));
            });

            // Voeg RateLimiter toe aan de DI-container
            builder.Services.AddRateLimiter(options =>
            {
                options.GlobalLimiter = PartitionedRateLimiter.Create<HttpContext, string>(httpContext =>
                    RateLimitPartition.GetFixedWindowLimiter(
                        partitionKey: httpContext.User.Identity?.Name ?? httpContext.Request.Headers.Host.ToString(),
                        factory: partition => new FixedWindowRateLimiterOptions
                        {
                            AutoReplenishment = true,
                            PermitLimit = 1000,
                            QueueLimit = 0,
                            Window = TimeSpan.FromMinutes(1)
                        }));
            });

            var httpsConnectionAdapterOptions = new HttpsConnectionAdapterOptions
            {
                SslProtocols = System.Security.Authentication.SslProtocols.Tls12,
                ClientCertificateMode = ClientCertificateMode.AllowCertificate,
                ServerCertificate = new X509Certificate2("./certificate.pfx", "password")

            };
            builder.WebHost.ConfigureKestrel(kestrelOptions =>
                kestrelOptions.ConfigureEndpointDefaults(listenOptions =>
            listenOptions.UseHttps(httpsConnectionAdapterOptions)));

            // CORS-configuratie voor React-client
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowedHosts", builder =>
                {
                    builder.AllowAnyOrigin()
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .SetPreflightMaxAge(TimeSpan.FromSeconds(3600));
                });
            });

            // JWT-configuratie
            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.IncludeErrorDetails = true;
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        RequireExpirationTime = true,
                        ValidIssuer = builder.Configuration["Jwt:Issuer"],
                        ValidAudience = builder.Configuration["Jwt:Audience"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:PrivateKey"]))
                    };
                });

            // Voeg autorisatie toe aan de DI-container
            builder.Services.AddAuthorization();

            // Voeg de controllers toe aan de DI-container
            builder.Services.AddControllers();
            builder.Services.AddSingleton<IApplicationBuilder, ApplicationBuilder>();

            // Voeg DatabaseContext toe aan de DI-container
            builder.Services.AddDbContext<FleetManagerContext>(options =>
            {
                options.UseSqlServer(builder.Configuration.GetConnectionString("Default"))
                    .EnableSensitiveDataLogging()
                    .LogTo(Console.WriteLine, LogLevel.Information);
            });

            // Registreer SqlServerHealthCheck en voeg het toe aan de HealthChecks
            builder.Services.AddHealthChecks().AddCheck<SqlServerHealthCheck>("sql");

            builder.Services.AddAutoMapper(typeof(MappingConfig));

            builder.Services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "TheTestService", Version = "v1" });
                c.AddSecurityDefinition("bearerAuth", new OpenApiSecurityScheme
                {
                    Name = "Authorization",
                    Type = SecuritySchemeType.Http,
                    Scheme = "bearer",
                    BearerFormat = "JWT",
                    In = ParameterLocation.Header,
                    Description = "JWT Authorization header using the Bearer scheme.",
                });

                c.OperationFilter<AuthOperationFilter>();
            });

            var app = builder.Build();

            app.UseHttpsRedirection();

            // Voer de HealthCheck-resultaten uit
            var timer = new Timer(state =>
            {
                LogHealthCheckResults(app);
            }, null, TimeSpan.Zero, TimeSpan.FromSeconds(5));

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.Logger.LogDebug("In Development environment");
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            
            app.UseRouting();

            app.UseCors(builder =>
            {
                builder.AllowAnyOrigin()
                       .AllowAnyHeader()
                       .AllowAnyMethod();
            });

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseForwardedHeaders(new ForwardedHeadersOptions
            {
                ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
            });

            app.MapControllers();

            app.Run();
        }
        public class NewAuthOperationFilter : IOperationFilter
        {
            public void Apply(OpenApiOperation operation, OperationFilterContext context)
            {
                var authAttributes = context.MethodInfo
                  .GetCustomAttributes(true)
                  .OfType<AuthorizeAttribute>()
                  .Distinct();

                if (authAttributes.Any())
                {
                    operation.Responses.TryAdd("401", new OpenApiResponse { Description = "Unauthorized" });
                    operation.Responses.TryAdd("403", new OpenApiResponse { Description = "Forbidden" });

                    var jwtbearerScheme = new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "bearerAuth" }
                    };

                    operation.Security = new List<OpenApiSecurityRequirement>
                {
                    new OpenApiSecurityRequirement
                    {
                        [ jwtbearerScheme ] = new string [] { }
                    }
                };
                }
            }
        }

        public class SqlServerHealthCheck : IHealthCheck
        {
            private readonly SqlConnection _connection;

            public string Name => "sql";

            public SqlServerHealthCheck(SqlConnection connection)
            {
                _connection = connection;
            }

            public async Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context, CancellationToken cancellationToken = default)
            {
                try
                {
                    await _connection.OpenAsync(cancellationToken);
                }
                catch (SqlException)
                {
                    return HealthCheckResult.Unhealthy();
                }

                return HealthCheckResult.Healthy();
            }
        }

        private static void LogHealthCheckResults(IHost app)
        {
            // Voer de HealthCheck uit en log de resultaten
            var healthCheckService = app.Services.GetRequiredService<HealthCheckService>();
            var results = healthCheckService.CheckHealthAsync().GetAwaiter().GetResult();

            foreach (var result in results.Entries)
            {
                app.Services.GetRequiredService<ILogger<Program>>().LogInformation($"{result.Key}: DB is {result.Value.Status}");
            }
        }
    }
}
