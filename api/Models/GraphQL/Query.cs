using System;
using System.Linq;
using System.Threading.Tasks;
using Barkeeper.Data;
using Barkeeper.Models.Database;
using HotChocolate.Authorization;
using HotChocolate.Types.Relay;

public class Query {
    public async Task<User> GetUser(string Id, BarkeeperContext Context) {
        return await Context.Users.FindAsync(Id) ?? new User();
    }

    public IQueryable<User> GetAllUsers(BarkeeperContext Context) {
        return Context.Users;
    }
}
