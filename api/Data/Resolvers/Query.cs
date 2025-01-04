using System;
using System.Linq;
using System.Threading.Tasks;
using Barkeeper.Data;
using Barkeeper.Models.Database;
using HotChocolate.Authorization;
using HotChocolate.Data;
using HotChocolate.Types.Relay;
using Microsoft.EntityFrameworkCore;

namespace Barkeeper.Data.Resolvers;

public class Query {
    public async Task<User> GetUser(string Id, BarkeeperContext Context) {
        return await Context.Users.FindAsync(Id) ?? new User();
    }

    public IQueryable<User> GetAllUsers(BarkeeperContext Context) {
        return Context.Users;
    }

    public IQueryable<Cocktail> GetAllCocktails(BarkeeperContext Context) {
        return Context.Cocktails;
    }

    public IQueryable<Ingredient> GetAllIngredients(BarkeeperContext Context) {
        return Context.Ingredients;
    }

    public IQueryable<Product> GetAllProducts(BarkeeperContext Context) {
        return Context.Products;
    }

    public IQueryable<ShoppingItem> GetShoppingItems([ID] string UserId, BarkeeperContext Context) {
        return Context.ShoppingItems.Where(x => x.UserId == UserId);
    }
}
