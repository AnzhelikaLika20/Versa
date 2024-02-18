using VersaProject.Bll.Models;

namespace VersaProject.Bll.Services.Interfaces;

public interface IRegisterUserService
{
    public Task<long> SaveUser(SaveUserModel data, CancellationToken cancellationToken);
}