using System.Reflection;
using Barkeeper.Data.Interfaces;
using Barkeeper.Models.Database;
using Barkeeper.Models.Request;
using Barkeeper.Models.Utility;
using Microsoft.EntityFrameworkCore;

namespace Barkeeper.Data.Repositories;

public class CocktailRepository(BarkeeperContext Context) : BaseRepository(Context), ICocktailRepository {
    public async Task<PagedResult<Cocktail>> GetRecentCocktails(PagingOptions Options) {
        var query = context.Cocktails.OrderByDescending(c => c.CreatedAt).AsQueryable();

        var count = await query.CountAsync();
        var cocktails = await query
            .Skip(Options.Page * Options.PageSize)
            .Take(Options.PageSize)
            .ToListAsync();

        return new PagedResult<Cocktail>(
            Options.Page,
            Options.PageSize,
            count,
            cocktails,
            ["CreatedAt"],
            Options.SortDirection
        );

    }

    public async Task<Cocktail?> GetFullCocktail(int Id) {
        return await context.Cocktails
            .Include(c => c.CocktailIngredients)
                .ThenInclude(ci => ci.Ingredient)
            .Include(c => c.CocktailIngredients)
            .ThenInclude(ci => ci.Product)
                .ThenInclude(p => p!.Ingredient)
            .Include(c => c.CreatedBy)
            .FirstOrDefaultAsync(c => c.Id == Id);
    }

    public async Task<int> GetCountForCocktail(int CocktailId, int DaysAgo = 30) {
        var date = DateTime.Now.AddDays(-DaysAgo).Date;
        return await context.UserHistories
            .Where(c => c.CocktailId == CocktailId && c.DrinkDate >= date)
            .CountAsync();
    }

    public async Task<Cocktail> CreateCocktail(string createdById, CreateCocktailRequest request) {
        var cocktail = new Cocktail {
            Name = request.Name,
            Instructions = request.Instructions,
            Notes = request.Notes,
            CreatedById = createdById,
            CreatedAt = DateTime.Now,
            UpdatedAt = DateTime.Now,
        };

        context.Cocktails.Add(cocktail);
        await context.SaveChangesAsync();

        for (int i = 0; i < request.Ingredients.Count; i++) {
            var ingredientRequest = request.Ingredients[i];
            var cocktailIngredient = new CocktailIngredient {
                CocktailId = cocktail.Id,
                IngredientId = ingredientRequest.IngredientId,
                Amount = ingredientRequest.Amount,
                Units = ingredientRequest.Units,
                ProductId = ingredientRequest.ProductId,
                Order = i,
            };

            context.CocktailIngredients.Add(cocktailIngredient);
        }

        await context.SaveChangesAsync();

        return await GetFullCocktail(cocktail.Id) ?? cocktail;
    }
}
