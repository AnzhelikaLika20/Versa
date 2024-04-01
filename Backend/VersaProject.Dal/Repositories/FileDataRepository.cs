using Microsoft.EntityFrameworkCore;
using VersaProject.Dal.Entities;
using VersaProject.Dal.Infrastructure;
using VersaProject.Dal.Repositories.Interfaces;

namespace VersaProject.Dal.Repositories;

public class FileDataRepository(ApplicationDbContext context) : IFileDataRepository
{
    public void SaveFileDataAsync(FileData fileData)
    {
        context.FilesData.Add(fileData);
        context.SaveChangesAsync();
    }

    public async Task<FileData?> GetLatestFileData(string fileName, string login)
    {
        var latestFileVersion = await context.FilesData
            .Where(f => f.FileName == fileName)
            .Where(f => f.UserLogin == login)
            .OrderByDescending(f => f.Version)
            .FirstOrDefaultAsync();

        return latestFileVersion;
    }

    public async void DropFileVersion(string fileName, int version, string currentUser)
    {
        var entityToDelete = await context.FilesData.FirstOrDefaultAsync(e =>
            e.UserLogin == currentUser && e.FileName == fileName && e.Version == version);

        if (entityToDelete != null)
        {
            context.FilesData.Remove(entityToDelete);
            await context.SaveChangesAsync();
        }
    }

    public async Task<List<FileData>> GetAllFiles(string currentUser)
    {
        var entities = await context.FilesData
            .Where(e => e.UserLogin == currentUser)
            .ToListAsync();

        return entities;
    }
}