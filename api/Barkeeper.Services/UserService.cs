using Barkeeper.Data.Interfaces;
using Barkeeper.Models.Database;
using Barkeeper.Services.Interfaces;

namespace Barkeeper.Services;

public class UserService(IUserRepository UserRepo) : IUserService {
    public async Task<User?> CreateOrUpdateUser(User User) {
        return await UserRepo.CreateOrUpdateUser(User);
    }

    public async Task<User?> GetUser(string Id) {
        return await UserRepo.Get(Id);
    }

    public async Task<bool> UsernameExists(string Username, string CurrentUserId) {
        return await UserRepo.UsernameExists(Username, CurrentUserId);
    }
}
