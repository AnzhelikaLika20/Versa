using MediatR;
using Microsoft.AspNetCore.Mvc;
using VersaProject.Api.Requests;
using VersaProject.Bll.Commands;

namespace VersaProject.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class WorkingEnvironmentController : ControllerBase
{
    private readonly IMediator _mediator;
    private readonly ILogger<WorkingEnvironmentController> _logger;

    public WorkingEnvironmentController(ILogger<WorkingEnvironmentController> logger, IMediator mediator)
    {
        _logger = logger;
        _mediator = mediator;
    }

    [HttpPost("registerUser")]
    public async  Task<long> RegisterUser(RegisterUserRequest request, CancellationToken token)
    {
        var command = new AddUserCommand(
            request.Id,
            request.Name);
        var result = await _mediator.Send(command, token);

        return result;
    }
}