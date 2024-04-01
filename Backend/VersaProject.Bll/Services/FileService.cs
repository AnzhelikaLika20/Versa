using System.Text;
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
    
    private GetObjectRequest CreateGetObjectRequest(string fileName)
    {
        GetObjectRequest request = new GetObjectRequest
        {
            BucketName = "versa",
            Key = fileName,
        };
        return request;
    }
    
    private DeleteObjectRequest CreateDeleteObjectRequest(string fileName)
    {
        DeleteObjectRequest request = new DeleteObjectRequest
        {
            BucketName = "versa",
            Key = fileName,
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
            
        fileDataRepository.SaveFileDataAsync(fileData);
    }

    public async Task<GetObjectResponse> GetFile(string fileName, int version, string currentUser)
    {
        var fileId = $"{fileName}_{version}_{currentUser}";
        AmazonS3Config configsS3 = GetS3Config();
        var secretKey = cloudSettings.Value.SecretAccessKey;
        var accessKey = cloudSettings.Value.AccessKeyId;
        
        AmazonS3Client s3Client = new AmazonS3Client(accessKey, secretKey, configsS3);
        GetObjectRequest request = CreateGetObjectRequest(fileId);
        GetObjectResponse response = await s3Client.GetObjectAsync(request);
        
        return response;
    }
    
    public async Task<DeleteObjectResponse> DeleteFile(string fileName, int version, string currentUser)
    {
        var fileId = $"{fileName}_{version}_{currentUser}";
        AmazonS3Config configsS3 = GetS3Config();
        var secretKey = cloudSettings.Value.SecretAccessKey;
        var accessKey = cloudSettings.Value.AccessKeyId;
        
        AmazonS3Client s3Client = new AmazonS3Client(accessKey, secretKey, configsS3);
        DeleteObjectRequest request = CreateDeleteObjectRequest(fileId);
        DeleteObjectResponse response = await s3Client.DeleteObjectAsync(request);
        
        return response;
    }

    public async Task<string> ReadReceivedFile(GetObjectResponse response)
    {
        using (StreamReader reader = new StreamReader(response.ResponseStream, Encoding.UTF8))
        {
            string fileContent = await reader.ReadToEndAsync();
            return fileContent;
        }
    }

    public async void DropFileVersion(string fileName, int version, string currentUser)
    {
        fileDataRepository.DropFileVersion(fileName, version, currentUser);
    }
}