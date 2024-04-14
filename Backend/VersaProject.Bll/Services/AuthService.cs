using System.Security.Claims;
using System.Transactions;
using Microsoft.AspNetCore.Identity;
using VersaProject.Bll.Services.Interfaces;
using VersaProject.Dal.Entities;
using VersaProject.Dal.Repositories.Interfaces;

namespace VersaProject.Bll.Services;

public class AuthService(
    IFileService fileService, 
    UserManager<User> userManager
    ) : IAuthService
{
    public async Task DeleteAccount(string? currentUser)
    {
        using var transaction = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled);
        var userFiles = await fileService.GetAllFiles(currentUser);
        foreach (var file in userFiles)
        {
            await fileService.DeleteFile(file.FileName, file.Version, currentUser);
            await fileService.DropFileVersion(file.FileName, file.Version, currentUser);
        }

        var user = await userManager.FindByNameAsync(currentUser);
        await userManager.DeleteAsync(user);
        transaction.Complete();
    }
}