using System.Net;
using Amazon.S3;
using Amazon.S3.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Options;
using VersaProject.Bll.Services.Interfaces;
using VersaProject.Dal.Entities;
using VersaProject.Dal.Repositories;
using VersaProject.Dal.Repositories.Interfaces;
using VersaProject.Dal.Settings;

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
            var response = fileService.SaveFile(file, currentUser);
            
            if (response.Result.HttpStatusCode == HttpStatusCode.OK)
            {
                fileService.StoreFileInfo(file, currentUser);
                return Ok("File uploaded successfully");
            }
            return StatusCode((int)response.Result.HttpStatusCode, "Failed to upload file");
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