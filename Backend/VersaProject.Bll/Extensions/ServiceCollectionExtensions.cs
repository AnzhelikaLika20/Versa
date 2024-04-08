using Microsoft.Extensions.DependencyInjection;
using VersaProject.Bll.Services;
using VersaProject.Bll.Services.Interfaces;

namespace VersaProject.Bll.Extensions;

public static class ServiceCollectionExtensions
{
    public static void AddBllServices(this IServiceCollection services)
    {
        services.AddScoped<IFileService, FileService>();
    }
}