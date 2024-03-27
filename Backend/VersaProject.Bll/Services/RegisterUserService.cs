using VersaProject.Bll.Models;
using VersaProject.Bll.Services.Interfaces;
using VersaProject.Dal.Entities;
using VersaProject.Dal.Repositories.Interfaces;

namespace VersaProject.Bll.Services;

public class RegisterUserService : IRegisterUserService
{
    private readonly IUserRepository _userRepository;

    public RegisterUserService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<long> SaveUser(SaveUserModel data, CancellationToken cancellationToken)
    {
        var user = new User(data.Id, data.Name);
        using var transaction = _userRepository.CreateTransactionScope();
        var id = await _userRepository.Add(user, cancellationToken);
        transaction.Complete();
        return id;
    }
}