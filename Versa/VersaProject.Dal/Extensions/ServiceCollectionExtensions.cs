using FluentMigrator.Runner.Generators.Postgres;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using VersaProject.Dal.Infrastructure;
using VersaProject.Dal.Settings;
    
namespace VersaProject.Dal.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddDalRepositories(this IServiceCollection services)
    {
        return services;
    }

    public static IServiceCollection AddDalInfrastructure(this IServiceCollection services, IConfiguration config)
    {
        services.Configure<DalOptions>(options => config.GetSection(nameof(DalOptions)).Bind(options));

        Postgres.MapCompositeTypes();

        Postgres.AddMigrations(services);

        return services;
    }
}