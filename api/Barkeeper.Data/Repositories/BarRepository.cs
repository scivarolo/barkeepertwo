using Barkeeper.Data.Interfaces;
using Barkeeper.Models.Database;
using Microsoft.EntityFrameworkCore;

namespace Barkeeper.Data.Repositories;

public class BarRepository(BarkeeperContext Context) : BaseRepository(Context), IBarRepository {
    public async Task<ICollection<UserIngredient>> GetUserIngredients(string userId) {
        return await context.UserIngredients
            .Where(ui => ui.UserId == userId)
            .Include(ui => ui.Ingredient)
                .ThenInclude(i => i.IngredientType)
            .OrderBy(ui => ui.Ingredient.Name)
            .ToListAsync();
    }

    public async Task<UserIngredient> AddIngredient(string userId, int ingredientId) {
        var exists = await context.UserIngredients
            .AnyAsync(ui => ui.UserId == userId && ui.IngredientId == ingredientId);

        if (exists) {
            var existing = await context.UserIngredients
                .Include(ui => ui.Ingredient)
                    .ThenInclude(i => i.IngredientType)
                .FirstOrDefaultAsync(ui => ui.UserId == userId && ui.IngredientId == ingredientId);
            return existing!;
        }

        var userIngredient = new UserIngredient {
            UserId = userId,
            IngredientId = ingredientId,
            DateAdded = DateTime.Now
        };

        context.UserIngredients.Add(userIngredient);
        await context.SaveChangesAsync();

        await context.Entry(userIngredient).Reference(ui => ui.Ingredient).LoadAsync();
        await context.Entry(userIngredient.Ingredient).Reference(i => i.IngredientType).LoadAsync();

        return userIngredient;
    }

    public async Task RemoveIngredient(string userId, int ingredientId) {
        var userIngredient = await context.UserIngredients
            .FirstOrDefaultAsync(ui => ui.UserId == userId && ui.IngredientId == ingredientId);

        if (userIngredient != null) {
            context.UserIngredients.Remove(userIngredient);
            await context.SaveChangesAsync();
        }
    }
}
