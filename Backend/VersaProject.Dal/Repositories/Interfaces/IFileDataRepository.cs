using VersaProject.Dal.Entities;

namespace VersaProject.Dal.Repositories.Interfaces;

public interface IFileDataRepository
{
    public Task SaveFileDataAsync(FileData fileData);
    public Task<FileData?> GetLatestFileData(string fileName, string? login);
    public Task DropFileVersion(string fileName, int version, string currentUser);
    public Task<List<FileData>> GetAllFiles(string currentUser);
}