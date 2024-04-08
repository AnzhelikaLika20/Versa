using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using VersaProject.Dal.Infrastructure;
using VersaProject.Dal.Repositories;
using VersaProject.Dal.Repositories.Interfaces;
using VersaProject.Dal.Settings;

namespace VersaProject.Dal.Extensions;

public static class ServiceCollectionExtensions
{
    public static void AddDalRepositories(this IServiceCollection services)
    {
        services.AddScoped<IFileDataRepository, FileDataRepository>();
    }

    public static IServiceCollection AddDalInfrastructure(this IServiceCollection services, DatabaseSettings config)
    {
        services.AddDbContext<ApplicationDbContext>(options =>
            options.UseNpgsql(config.ConnectionString));
        return services;
    }
}