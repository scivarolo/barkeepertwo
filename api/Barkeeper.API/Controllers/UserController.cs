using Barkeeper.Models.Database;
using Barkeeper.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Barkeeper.API.Controllers;

public class UserController(IUserService UserService) : BarkeeperControllerBase {
    [HttpGet]
    public async Task<IActionResult> Get(string Id) {
        var user = await UserService.GetUser(Id);
        if (Id == CurrentUserId) {
            if (user == null || user.DisplayName != CurrentUserName) {
                user = await UserService.CreateOrUpdateUser(new Models.Database.User {
                    Id = Id,
                    DisplayName = CurrentUserName,
                });
            }
        }

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
        var user = await UserService.CreateOrUpdateUser(User);
        return user;
    }
}
