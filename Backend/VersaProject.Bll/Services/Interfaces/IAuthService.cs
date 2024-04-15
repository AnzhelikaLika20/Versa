namespace VersaProject.Bll.Services.Interfaces;

public interface IAuthService
{
    public Task DeleteAccount(string? currentUser);
}