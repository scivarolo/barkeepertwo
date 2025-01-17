using Barkeeper.Models.Database;

namespace Barkeeper.Data.Interfaces;

public interface IUserRepository : IBaseRepository {
    Task<User?> Get(string Id);

    Task<User?> CreateOrUpdateUser(User User);

    Task<bool> UsernameExists(string Username, string CurrentUserId);
}
