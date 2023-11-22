using System.Threading.RateLimiting;
using FleetManager.Models;
using Microsoft.EntityFrameworkCore;

namespace Back_end
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Services.AddRateLimiter(options =>
            {
                options.GlobalLimiter = PartitionedRateLimiter.Create<HttpContext, string>(httpContext =>
                    RateLimitPartition.GetFixedWindowLimiter(
                        partitionKey: httpContext.User.Identity?.Name ?? httpContext.Request.Headers.Host.ToString(),
                        factory: partition => new FixedWindowRateLimiterOptions
                        {
                            AutoReplenishment = true,
                            PermitLimit = 100,
                            QueueLimit = 0,
                            Window = TimeSpan.FromMinutes(1)
                        }));
            });

            builder.Services.AddControllers();

            //builder.Services.AddSingleton<ICountryRepository, CountryRepository>();
            builder.Services.AddSingleton<IApplicationBuilder, ApplicationBuilder>();

            // Voor REACT client toegevoegd: Cors = Cross Origin Resource Sharing
            {
                Console.WriteLine("Cors active");
                // Adding CORS Policy // Cors = Cross Origin Resource Sharing voor React client
                builder.Services.AddCors(options =>
                {
                    options.AddPolicy("AllowOrigin", builder =>
                    {
                        builder.AllowAnyOrigin()
                            .AllowAnyHeader() // .WithHeaders("accept", "content-type", "origin", "x-custom-header")
                            .AllowAnyMethod() // .WithMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                            .SetPreflightMaxAge(TimeSpan.FromSeconds(3600));
                    });
                });
            }
            
            builder.Services.AddDbContext<FleetManagerContext>(options =>
            {
                options.UseSqlServer(builder.Configuration.GetConnectionString("Default"));
            });
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(c =>
            {
                // Helps fix api conflicts for Swagger - see HttpGet with "~/"
                c.ResolveConflictingActions(apiDescriptions => apiDescriptions.First());
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            app.UseAuthorization();

            app.UseRouting(); 
            app.UseRateLimiter(); // RateLimiting is voor de beveiliging van de API

            app.MapControllers();

            app.UseCors("AllowOrigin"); // Cors = Cross Origin Resource Sharing voor React client

            app.Run();
        }
    }
}