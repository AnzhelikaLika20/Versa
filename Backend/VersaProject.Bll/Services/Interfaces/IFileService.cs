using Amazon.S3.Model;
using Microsoft.AspNetCore.Http;

namespace VersaProject.Bll.Services.Interfaces;

public interface IFileService
{
    public Task<PutObjectResponse> SaveFile(IFormFile file, string currentUser);
    public void StoreFileInfo(IFormFile file, string currentUser);
    public Task<GetObjectResponse> GetFile(string fileName, int version, string currentUser);
    public Task<string> ReadReceivedFile(GetObjectResponse response);
}