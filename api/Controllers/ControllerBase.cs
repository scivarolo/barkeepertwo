using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Barkeeper.Controllers;

[Authorize]
[ApiController]
[Route("[controller]/[action]")]
public class ControllerBase : Controller {
    protected string CurrentUserId => HttpContext.User.Identity.Name;
    protected string[] CurrentUserPermissions => HttpContext.User.FindAll("permissions").Select(x => x.Value).ToArray();

    protected bool UserHasPermission(string Permission) => CurrentUserPermissions.Contains(Permission);
}
