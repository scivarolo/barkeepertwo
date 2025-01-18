using Barkeeper.Models.Database;

namespace Barkeeper.Services.Interfaces;

public interface IUserService {

    Task<User?> GetUser(string Id);

    Task<User?> CreateOrUpdateUser(User User);

    Task<bool> UsernameExists(string Username, string CurrentUserId);
}
