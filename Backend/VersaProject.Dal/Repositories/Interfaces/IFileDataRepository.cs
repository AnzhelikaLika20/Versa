using VersaProject.Dal.Entities;

namespace VersaProject.Dal.Repositories.Interfaces;

public interface IFileDataRepository
{
    public Task<int> SaveFileDataAsync(FileData fileData);
}