using Barkeeper.Models.Database;
using HotChocolate.Types.Relay;

namespace Barkeeper.Models.GraphQL;

public record UserInput([ID] string Id, string DisplayName);

public class UserPayload {
    public UserPayload(User User) {
        this.User = User;
    }
    public User User { get; }
}
