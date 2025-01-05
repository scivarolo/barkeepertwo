using System.Threading.Tasks;
using Barkeeper.Data.Interfaces;
using Barkeeper.Extensions.Authorization;
using Barkeeper.Models.Database;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Barkeeper.Controllers;

public class UserController : ControllerBase {
    private readonly IUserRepository userRepo;

    public UserController(IUserRepository UserRepo) {
        userRepo = UserRepo;
    }

    [HttpGet]
    [Authorize(AuthPolicy.Admin)]
    public async Task<User?> Get(string Id) {
        return await userRepo.Get(Id);
    }
}
