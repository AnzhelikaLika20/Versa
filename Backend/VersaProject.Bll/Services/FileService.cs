using System.Net;
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

public class FileService(IOptionsSnapshot<YandexCloudSettings> cloudSettings, IFileDataRepository fileDataRepository)
    : IFileService
{
    public async Task<PutObjectResponse> SaveFile(IFormFile file, string currentUser)
    {
        var configsS3 = GetS3Config();
        var secretKey = cloudSettings.Value.SecretAccessKey;
        var accessKey = cloudSettings.Value.AccessKeyId;

        var s3Client = new AmazonS3Client(accessKey, secretKey, configsS3);
        var request = await CreatePutObjectRequest(file, currentUser);
        var response = await s3Client.PutObjectAsync(request);

        return response;
    }

    public async Task StoreFileInfo(IFormFile file, string currentUser)
    {
        var uniqueId = Guid.NewGuid().ToString();
        var newVersion = await GetLastFileVersion(file, currentUser) + 1;
        var fileName = file.FileName;

        var fileData = new FileData
        {
            FileName = fileName,
            Id = uniqueId,
            Version = newVersion,
            UserLogin = currentUser,
            CreationTime = DateTime.Now
        };

        await fileDataRepository.SaveFileDataAsync(fileData);
    }

    public async Task<GetObjectResponse> GetFile(string fileName, int version, string currentUser)
    {
        var fileId = $"{fileName}_{version}_{currentUser}";
        var configsS3 = GetS3Config();
        var secretKey = cloudSettings.Value.SecretAccessKey;
        var accessKey = cloudSettings.Value.AccessKeyId;

        var s3Client = new AmazonS3Client(accessKey, secretKey, configsS3);
        var request = CreateGetObjectRequest(fileId);
        var response = await s3Client.GetObjectAsync(request);

        return response;
    }

    public async Task<DeleteObjectResponse> DeleteFile(string fileName, int version, string currentUser)
    {
        var fileId = $"{fileName}_{version}_{currentUser}";
        var configsS3 = GetS3Config();
        var secretKey = cloudSettings.Value.SecretAccessKey;
        var accessKey = cloudSettings.Value.AccessKeyId;

        var s3Client = new AmazonS3Client(accessKey, secretKey, configsS3);
        var request = CreateDeleteObjectRequest(fileId);
        var response = await s3Client.DeleteObjectAsync(request);
        
        if(response.HttpStatusCode == HttpStatusCode.OK)
            await DropFileVersion(fileName, version, currentUser);


        return response;
    }

    public async Task<string> ReadReceivedFile(GetObjectResponse response)
    {
        using (var reader = new StreamReader(response.ResponseStream, Encoding.UTF8))
        {
            var fileContent = await reader.ReadToEndAsync();
            return fileContent;
        }
    }

    public async Task<List<FileData>> GetAllFiles(string currentUser)
    {
        return await fileDataRepository.GetAllFiles(currentUser);
    }

    public async Task DropFileVersion(string fileName, int version, string currentUser)
    {
        await fileDataRepository.DropFileVersion(fileName, version, currentUser);
    }

    private AmazonS3Config GetS3Config()
    {
        var configsS3 = new AmazonS3Config
        {
            ServiceURL = "https://s3.yandexcloud.net",
            ForcePathStyle = true,
            SignatureVersion = "2"
        };
        return configsS3;
    }

    public async Task<int> GetLastFileVersion(IFormFile file, string currentUser)
    {
        var fileName = file.FileName;
        var latestFileVersion = await fileDataRepository.GetLatestFileData(fileName, currentUser);
        if (latestFileVersion == null)
            return 0;
        return latestFileVersion.Version;
    }

    private async Task<PutObjectRequest> CreatePutObjectRequest(IFormFile file, string currentUser)
    {
        var newVersion = await GetLastFileVersion(file, currentUser);
        var fileName = $"{file.FileName}_{newVersion}_{currentUser}";
        var request = new PutObjectRequest
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
        var request = new GetObjectRequest
        {
            BucketName = "versa",
            Key = fileName
        };
        return request;
    }

    private DeleteObjectRequest CreateDeleteObjectRequest(string fileName)
    {
        var request = new DeleteObjectRequest
        {
            BucketName = "versa",
            Key = fileName
        };
        return request;
    }
}