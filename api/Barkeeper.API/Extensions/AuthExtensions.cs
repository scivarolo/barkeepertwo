using Microsoft.AspNetCore.Authorization;

namespace Barkeeper.API.Extensions.Authorization;

public class PermissionRequirement : IAuthorizationRequirement {
    public string Issuer { get; }
    public string Permission { get; }

    public PermissionRequirement(string permission, string issuer) {
        Permission = permission ?? throw new ArgumentNullException(nameof(permission));
        Issuer = issuer ?? throw new ArgumentNullException(nameof(issuer));
    }
}

public class HasPermissionHandler : AuthorizationHandler<PermissionRequirement> {
    protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, PermissionRequirement requirement) {
        if (context.User.HasClaim(c => c.Type == "permissions" && c.Value == requirement.Permission && c.Issuer == requirement.Issuer)) {
            context.Succeed(requirement);
        }
        return Task.CompletedTask;
    }
}

public static class AuthPolicy {
    public const string Admin = "admin";
    public const string User = "user";
}
