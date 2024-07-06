using System.Threading.Tasks;
using Barkeeper.Data;
using Barkeeper.Models.Database;
using HotChocolate;
using HotChocolate.Types.Relay;

namespace Barkeeper.Models.GraphQL;

public class Mutation {

    [GraphQLDescription("Inserts a new local user")]
    public async Task<UserPayload> AddUser(
        UserInput Input,
        BarkeeperContext Context
    ) {
        var user = new User {
            Id = Input.Id,
            DisplayName = Input.DisplayName,
        };
        Context.Users.Add(user);
        await Context.SaveChangesAsync();

        return new UserPayload(user);
    }

    [GraphQLDescription("Update an existing user's display name")]
    public async Task<UserPayload> UpdateUser([ID(nameof(User))] string Id, string DisplayName, BarkeeperContext Context) {
        var existingUser = await Context.Users.FindAsync(Id);
        if (existingUser == null) {
            throw new System.Exception("User does not exist");
        } else {
            existingUser.DisplayName = DisplayName;
            Context.Users.Update(existingUser);
            await Context.SaveChangesAsync();
            return new UserPayload(existingUser);
        }
    }
}
