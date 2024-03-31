using VersaProject.Dal.Entities;
using VersaProject.Dal.Infrastructure;
using VersaProject.Dal.Repositories.Interfaces;

namespace VersaProject.Dal.Repositories;

public class FileDataRepository(ApplicationDbContext context) : IFileDataRepository
{
    public async Task<int> SaveFileDataAsync(FileData fileData)
    {
        context.FilesData.Add(fileData);
        return await context.SaveChangesAsync();
    }
}