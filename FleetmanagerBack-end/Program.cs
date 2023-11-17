using FleetManager.Models;
using Microsoft.EntityFrameworkCore;

namespace Back_end
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddControllers();

            //builder.Services.AddSingleton<ICountryRepository, CountryRepository>();
            builder.Services.AddSingleton<IApplicationBuilder, ApplicationBuilder>();

            // Voor REACT client toegevoegd:
            {
                Console.WriteLine("Cors active");
                // Adding CORS Policy // Cors = Cross Origin Resource Sharing voor React client
                builder.Services.AddCors(options =>
                { // RateLimiting is voor de beveiliging van de API
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

            app.MapControllers();

            app.UseCors("AllowOrigin");

            app.Run();
        }
    }
}