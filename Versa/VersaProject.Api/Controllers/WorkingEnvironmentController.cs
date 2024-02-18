using Microsoft.AspNetCore.Mvc;

namespace VersaProject.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class WorkingEnvironmentController : ControllerBase
{
    private readonly ILogger<WorkingEnvironmentController> _logger;

    public WorkingEnvironmentController(ILogger<WorkingEnvironmentController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public File Get()
    {
        var file = new File("project");
        return file;
    }
}