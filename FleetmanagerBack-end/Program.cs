using System.Text;
using System.Threading.RateLimiting;
using FleetManager.Models;
using FleetManager.Profiles;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

namespace Back_end
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

            var builder = WebApplication.CreateBuilder(args);

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

            // Voor REACT client toegevoegd: Cors = Cross Origin Resource Sharing
            {
                Console.WriteLine("Cors active");
                // Adding CORS Policy // Cors = Cross Origin Resource Sharing voor React client
                builder.Services.AddCors(options =>
                {
                    options.AddPolicy("AllowedHosts", builder =>
                    {
                        builder.AllowAnyOrigin()
                            .AllowAnyHeader() // .WithHeaders("accept", "content-type", "origin", "x-custom-header")
                            .AllowAnyMethod() // .WithMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                            .SetPreflightMaxAge(TimeSpan.FromSeconds(3600));
                    });
                });
            }

            // For JWT:
            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme) // default scheme
                .AddJwtBearer(
                authenticationScheme: JwtBearerDefaults.AuthenticationScheme, // Bearer
                configureOptions: options =>
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

            builder.Services.AddAuthorization();

            builder.Services.AddControllers();

            builder.Services.AddSingleton<IApplicationBuilder, ApplicationBuilder>();

            builder.Services.AddDbContext<FleetManagerContext>(options =>
            {
                options.UseSqlServer(builder.Configuration.GetConnectionString("Default"))
                .EnableSensitiveDataLogging()
                .LogTo(Console.WriteLine, LogLevel.Information);
            });
            
            builder.Services.AddAutoMapper(typeof(MappingConfig));

            builder.Services.AddEndpointsApiExplorer();

            builder.Services.AddSwaggerGen(/*c =>
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

                       //////Add Operation Specific Authorization///////
                       c.OperationFilter<AuthOperationFilter>();
                       ////////////////////////////////////////////////
                   }*/);

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.Logger.LogDebug("In Development environment");
                app.UseSwagger();
                app.UseSwaggerUI(c =>
                {
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Your API V1");
                });
            }

            app.UseCors(builder =>
            {
                builder.AllowAnyOrigin()
                       .AllowAnyHeader()
                       .AllowAnyMethod();
            });

            app.UseHttpsRedirection();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseRouting();
            app.UseRateLimiter(); // RateLimiting is voor de beveiliging van de API

            app.MapControllers();

            app.Run();
        }
    }
}