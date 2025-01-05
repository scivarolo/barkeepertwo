using System.Threading.Tasks;
using Barkeeper.Data.Interfaces;
using Barkeeper.Models.Database;

namespace Barkeeper.Data.Repositories;

public class UserRepository : IUserRepository {
    private readonly BarkeeperContext context;

    public UserRepository(BarkeeperContext Context) {
        context = Context;
    }

    public async Task<User?> Get(string id) {
        return await context.Users.FindAsync(id);
    }
}
