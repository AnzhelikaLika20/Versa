using Amazon.S3;
using Amazon.S3.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Options;
using VersaProject.Dal.Entities;
using VersaProject.Dal.Repositories;
using VersaProject.Dal.Repositories.Interfaces;
using VersaProject.Dal.Settings;

namespace VersaProject.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class WorkingEnvironmentController(IOptionsSnapshot<YandexCloudSettings> cloudSettings, IFileDataRepository fileDataRepository) : ControllerBase
{
    [HttpPost("UploadFile")]
    public async Task<IActionResult> UploadFile(IFormFile file)
    {
        try
        {
            AmazonS3Config configsS3 = new AmazonS3Config
            {
                ServiceURL = "https://s3.yandexcloud.net",
                ForcePathStyle = true,
                SignatureVersion = "2" 
            };
            var secretKey = cloudSettings.Value.SecretAccessKey;
            var accessKey = cloudSettings.Value.AccessKeyId;
            AmazonS3Client s3Client = new AmazonS3Client(accessKey, secretKey, configsS3);
            string uniqueId = Guid.NewGuid().ToString();

            PutObjectRequest request = new PutObjectRequest
            {
                BucketName = "versa",
                Key = uniqueId,
                ContentType = file.ContentType,
                InputStream = file.OpenReadStream()
            };

            PutObjectResponse response = await s3Client.PutObjectAsync(request);
            var fileData = new FileData { 
                FileName = file.FileName, 
                Id = uniqueId, 
                Version = 2};
            
            await fileDataRepository.SaveFileDataAsync(fileData);
            
            if (response.HttpStatusCode == System.Net.HttpStatusCode.OK)
            {
                return Ok("File uploaded successfully");
            }
            return StatusCode((int)response.HttpStatusCode, "Failed to upload file");
        }
        catch (AmazonS3Exception ex)
        {
            return StatusCode((int)ex.StatusCode, $"Amazon S3 Error: {ex.Message}");
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error: {ex.Message}");
        }
    }
}