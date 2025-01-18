using Barkeeper.Data.Interfaces;
using Barkeeper.Models.Database;
using Microsoft.AspNetCore.Mvc;

namespace Barkeeper.Controllers;

public class UserController(IUserRepository UserRepo) : ControllerBase {
    [HttpGet]
    public async Task<IActionResult> Get(string Id) {
        var user = await UserRepo.Get(Id);
        if (user == null) {
            return NoContent();
        } else {
            return Ok(user);
        }
    }

    [HttpPost]
    public async Task<User?> Update(User User) {
        if (User.Id != CurrentUserId && !UserHasPermission("admin")) {
            throw new Exception("User does not have permission to perform this action");
        }
        var user = await UserRepo.CreateOrUpdateUser(User);
        return user;
    }
}
