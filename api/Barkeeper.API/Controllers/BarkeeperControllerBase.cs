using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Barkeeper.API.Controllers;

[Authorize]
[ApiController]
[Route("[controller]/[action]")]
public class BarkeeperControllerBase : Controller {
    protected string CurrentUserId => HttpContext.User.Identity?.Name ?? string.Empty;
    protected string? CurrentUserName => HttpContext.User.FindFirst("http://barkeeper.sebastiancivarolo.com/claims/username")?.Value;
    protected string[] CurrentUserPermissions => HttpContext.User.FindAll("permissions").Select(x => x.Value).ToArray();

    protected bool UserHasPermission(string Permission) => CurrentUserPermissions.Contains(Permission);
}
