using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace VersaProject.Api.Controllers;

[ApiController]
[Authorize]
public class Controller : ControllerBase
{
    
}