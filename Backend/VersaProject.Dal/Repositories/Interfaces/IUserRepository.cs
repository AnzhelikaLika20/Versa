using VersaProject.Dal.Entities;

namespace VersaProject.Dal.Repositories.Interfaces;

public interface IUserRepository : IDbRepository
{
    Task<long> Add(
        User user,
        CancellationToken token);

    Task<User> Query(
        long id,
        CancellationToken token);
}