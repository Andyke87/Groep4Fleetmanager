using Microsoft.EntityFrameworkCore;
using FleetManager.Models;
using Microsoft.OpenApi.Models;
using Connections.Models;
using Back_end.Controllers;

public class Startup
{
    public IConfiguration Configuration { get; }

    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    public void ConfigureServices(IServiceCollection services)
    {
        services.AddDbContext<FleetManagerContext>(options =>
            options.UseSqlServer(Configuration.GetConnectionString("Default")));

        services.AddControllers();
        services.AddScoped<ConnectieController>();
        services.AddSwaggerGen(c =>
        {
            c.SwaggerDoc("v1", new OpenApiInfo { Title = "Your API", Version = "v1" });
        });
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
            app.UseSwagger();
            app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Your API V1"));
        }

        app.UseHttpsRedirection();
        app.UseRouting();
        app.UseAuthorization();

        using (var scope = app.ApplicationServices.CreateScope())
        {
            var dbContext = scope.ServiceProvider.GetRequiredService<FleetManagerContext>();
            dbContext.Database.Migrate();
        }

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
            endpoints.MapControllerRoute(
                name: "connectie",
                pattern: "api/connecties",
                defaults: new { controller = typeof(ConnectieApiGateway) }
            );
        });
    }
}

