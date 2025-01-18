using Barkeeper.Data.Interfaces;
using Barkeeper.Models.Database;
using Microsoft.EntityFrameworkCore;

namespace Barkeeper.Data.Repositories;

public class UserRepository(BarkeeperContext Context) : BaseRepository(Context), IUserRepository {

    public async Task<User?> Get(string id) {
        return await context.Users.FindAsync(id);
    }

    public async Task<User?> CreateOrUpdateUser(User User) {
        var existingUser = await context.Users.FindAsync(User.Id);
        if (existingUser == null) {
            context.Users.Add(User);
        } else {
            existingUser.DisplayName = User.DisplayName;
            context.Users.Update(existingUser);
        }
        await context.SaveChangesAsync();
        return User;
    }

    public async Task<bool> UsernameExists(string Username, string CurrentUserId) {
        return await context.Users.AnyAsync(u => u.DisplayName == Username && u.Id != CurrentUserId);
    }
}
