using System.Net;
using Amazon.S3;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VersaProject.Bll.Services.Interfaces;

namespace VersaProject.Api.Controllers;

[ApiController]
[Route("[controller]")]
[Authorize]
public class FilesController(IFileService fileService) : ControllerBase
{
    [HttpPost("UploadFile")]
    public async Task<IActionResult> UploadFile(IFormFile file)
    {
        try
        {
            var currentUser = User.Identity.Name;
            var response = await fileService.SaveFile(file, currentUser);

            if (response.HttpStatusCode == HttpStatusCode.OK)
            {
                fileService.StoreFileInfo(file, currentUser);
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

    [HttpGet("GetFileByVersion")]
    public async Task<IActionResult> GetFileByVersion(string fileName, int version)
    {
        try
        {
            var currentUser = User.Identity.Name;
            var response = await fileService.GetFile(fileName, version, currentUser);

            if (response.HttpStatusCode == HttpStatusCode.OK)
            {
                var file = await fileService.ReadReceivedFile(response);
                return Ok(file);
            }

            return StatusCode((int)response.HttpStatusCode, "Failed to download file");
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


    [HttpDelete("DeleteFileVersion")]
    public async Task<IActionResult> DeleteFileVersion(string fileName, int version)
    {
        try
        {
            var currentUser = User.Identity.Name;
            var response = await fileService.DeleteFile(fileName, version, currentUser);

            if (response.HttpStatusCode == HttpStatusCode.OK)
            {
                fileService.DropFileVersion(fileName, version, currentUser);
                return Ok("File dropped successfully");
            }

            return StatusCode((int)response.HttpStatusCode, "Failed to delete file");
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

    [HttpGet("GetAllFiles")]
    public async Task<IActionResult> GetAllFiles()
    {
        var currentUser = User.Identity.Name;
        var files = await fileService.GetAllFiles(currentUser);

        return Ok(files);
    }
}