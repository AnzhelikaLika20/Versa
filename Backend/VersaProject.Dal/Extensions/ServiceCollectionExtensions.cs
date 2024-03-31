
    
using Microsoft.EntityFrameworkCore;
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

    public static IServiceCollection AddDalInfrastructure(this IServiceCollection services, DatabaseSettings config)
    {
        services.AddDbContext<ApplicationDbContext>(options =>
            options.UseNpgsql(config.ConnectionString));
        return services;
    }
}