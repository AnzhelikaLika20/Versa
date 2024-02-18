using System.Transactions;
using Dapper;
using Microsoft.Extensions.Options;
using VersaProject.Dal.Models;
using VersaProject.Dal.Repositories.Interfaces;
using VersaProject.Dal.Settings;

namespace VersaProject.Dal.Repositories;

public class UserRepository : BaseRepository, IUserRepository
{
    public UserRepository(IOptions<DalOptions> dalSettings) : base(dalSettings.Value)
    {
    }

    public async Task<long> Add(User user,
        CancellationToken token)
    {
        const string sqlQuery = @"
insert into users (id, name)
select id, name
    from UNNEST(@User)
returning id
";
        var sqlQueryParams = new
        {
            User = user
        };

        await using var connection = await GetAndOpenConnection();
        var id = await connection.QueryAsync<long>(
            new CommandDefinition(
            sqlQuery,
            sqlQueryParams,
            cancellationToken: token));
        return id.FirstOrDefault();
    }

    public async Task<User> Query(long id, CancellationToken token)
    {
        const string sqlQuery = @"
select * from user where id = @Id;
";
        var sqlQueryParams = new
        {
            Id = id
        };

        await using var connection = await GetAndOpenConnection();
        var user = await connection.QueryAsync<User>(
            new CommandDefinition(
                sqlQuery,
                sqlQueryParams,
                cancellationToken: token));
        return user.FirstOrDefault();
    }
}