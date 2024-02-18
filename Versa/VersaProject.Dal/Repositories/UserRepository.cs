using System.Transactions;
using Dapper;
using Microsoft.Extensions.Options;
using VersaProject.Dal.Entities;
using VersaProject.Dal.Repositories.Interfaces;
using VersaProject.Dal.Settings;

namespace VersaProject.Dal.Repositories;

public class UserRepository : BaseRepository, IUserRepository
{
    public UserRepository(IOptions<DalOptions> dalSettings) : base(dalSettings.Value)
    {
    }

    public async Task<long> Add(User user, CancellationToken token)
    {
        const string sqlQuery = @"
        INSERT INTO users (id, name)
        VALUES (@Id, @Name)
        RETURNING id";
        
        await using var connection = await GetAndOpenConnection();
        var id = await connection.QuerySingleOrDefaultAsync<long>(
            new CommandDefinition(
                sqlQuery,
                new { user.Id, user.Name },
                cancellationToken: token));
    
        return id;
    }

    public async Task<User> Query(long id, CancellationToken token)
    {
        const string sqlQuery = @"
select * from Users where id = @Id;
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