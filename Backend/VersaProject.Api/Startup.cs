using Microsoft.OpenApi.Models;
using VersaProject.Dal.Extensions;
using MediatR;
using VersaProject.Bll.Commands;
using VersaProject.Bll.Services;
using VersaProject.Bll.Services.Interfaces;
using VersaProject.Dal.Repositories;
using VersaProject.Dal.Repositories.Interfaces;

namespace VersaProject.Api;

public class Startup
{
    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }
    
    public IConfiguration Configuration { get; }

    public void ConfigureServices(IServiceCollection services)
    {
        services.AddDalInfrastructure(Configuration).AddDalRepositories();
        services.AddTransient<IUserRepository, UserRepository>();
        services.AddMediatR(c => c.RegisterServicesFromAssembly(typeof(Startup).Assembly));
        services.AddScoped<IRequestHandler<AddUserCommand, long>, AddUserHandler>();
        services.AddSingleton<IRegisterUserService, RegisterUserService>();
        services.AddControllers();
        services.AddSwaggerGen(c =>
        {
            c.SwaggerDoc("v1", new OpenApiInfo { Title = "" });
        });
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
            app.UseSwagger();
            app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.jso", "Versa.Api v1"));
        }

        app.UseRouting();
        app.UseAuthorization();
        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();

        });
        app.MigrateUp();
    }
}