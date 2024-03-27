using System.Net;
using MediatR;
using VersaProject.Bll.Models;
using VersaProject.Bll.Services.Interfaces;

namespace VersaProject.Bll.Commands;

public record AddUserCommand(long Id, string Name) : IRequest<long>;

public class AddUserHandler : IRequestHandler<AddUserCommand, long>
{
    private readonly IRegisterUserService _registerUserService;

    public AddUserHandler(IRegisterUserService registerUserService)
    {
        _registerUserService = registerUserService;
    }
    
    public async Task<long> Handle(AddUserCommand request, CancellationToken cancellationToken)
    {
        var user = new SaveUserModel(request.Id, request.Name);
        var log = await _registerUserService.SaveUser(user, cancellationToken);
        return log;
    }
}