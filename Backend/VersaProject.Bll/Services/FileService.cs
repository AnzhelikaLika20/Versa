using Amazon.S3;
using Amazon.S3.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using VersaProject.Bll.Services.Interfaces;
using VersaProject.Dal.Entities;
using VersaProject.Dal.Repositories.Interfaces;
using VersaProject.Dal.Settings;
namespace VersaProject.Bll.Services;

public class FileService(IOptionsSnapshot<YandexCloudSettings> cloudSettings, IFileDataRepository fileDataRepository) : IFileService
{
    private AmazonS3Config GetS3Config()
    {
        AmazonS3Config configsS3 = new AmazonS3Config
        {
            ServiceURL = "https://s3.yandexcloud.net",
            ForcePathStyle = true,
            SignatureVersion = "2" 
        };
        return configsS3;
    }

    private async Task<int> GetLastFileVersion(IFormFile file, string currentUser)
    {
        var fileName = file.FileName;
        var latestFileVersion = await fileDataRepository.GetLatestFileData(fileName, currentUser);
        if (latestFileVersion == null)
            return -1;
        return latestFileVersion.Version;
    }

    private PutObjectRequest CreatePutObjectRequest(IFormFile file, string currentUser)
    {
        var newVersion = GetLastFileVersion(file, currentUser).Result + 1;
        var fileName = $"{file.FileName}_{newVersion}_{currentUser}";
        PutObjectRequest request = new PutObjectRequest
        {
            BucketName = "versa",
            Key = fileName,
            ContentType = file.ContentType,
            InputStream = file.OpenReadStream()
        };
        return request;
    }
    
    public async Task<PutObjectResponse> SaveFile(IFormFile file, string currentUser)
    {
        AmazonS3Config configsS3 = GetS3Config();
        var secretKey = cloudSettings.Value.SecretAccessKey;
        var accessKey = cloudSettings.Value.AccessKeyId;
        
        AmazonS3Client s3Client = new AmazonS3Client(accessKey, secretKey, configsS3);
        PutObjectRequest request = CreatePutObjectRequest(file, currentUser);
        PutObjectResponse response = await s3Client.PutObjectAsync(request);
        
        return response;
    }

    public async void StoreFileInfo(IFormFile file, string currentUser)
    {
        string uniqueId = Guid.NewGuid().ToString();
        var newVersion = GetLastFileVersion(file, currentUser).Result + 1;
        var fileName = file.FileName;
        
        var fileData = new FileData { 
            FileName = fileName, 
            Id = uniqueId, 
            Version = newVersion,
            UserLogin = currentUser
        };
            
        await fileDataRepository.SaveFileDataAsync(fileData);
    }
}