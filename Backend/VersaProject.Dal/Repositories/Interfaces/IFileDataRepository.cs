using VersaProject.Dal.Entities;

namespace VersaProject.Dal.Repositories.Interfaces;

public interface IFileDataRepository
{
    public void SaveFileDataAsync(FileData fileData);
    public Task<FileData?> GetLatestFileData(string fileName, string? login);
    public void DropFileVersion(string fileName, int version, string currentUser);
}