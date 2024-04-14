using System.Net;
using Amazon.S3;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VersaProject.Bll.Services.Interfaces;
using VersaProject.Dal.Infrastructure;

namespace VersaProject.Api.Controllers;

[ApiController]
[Route("api/v1/auth")]
[Authorize]
public class AuthController(IAuthService authService) : ControllerBase
{
    [HttpDelete]
    public async Task DropAccount()
    {
        var currentUser = User.Identity.Name;
        await authService.DeleteAccount(currentUser);
    }
}