using Barkeeper.Data.Interfaces;
using Barkeeper.Models.Database;
using Barkeeper.Models.Request;
using Microsoft.EntityFrameworkCore;

namespace Barkeeper.Data.Repositories;

public class IngredientRepository(BarkeeperContext Context) : BaseRepository(Context), IIngredientRepository {
    public async Task<Ingredient?> SaveIngredient(IngredientRequest Ingredient) {
        if (Ingredient.Id == default) {
            var exists = context.Ingredients.Any(i => i.Name == Ingredient.Name);
            if (exists) {
                throw new Exception("An ingredient with this name already exists.");
            }
        }

        var ingredient = new Ingredient(Ingredient);
        context.Ingredients.Update(ingredient);
        await context.SaveChangesAsync();
        return ingredient;
    }

    public async Task<ICollection<Ingredient>> GetIngredients() {
        return await context.Ingredients.OrderBy(x => x.Name).ToListAsync();
    }

    public async Task<ICollection<IngredientType>> GetIngredientTypes() {
        return await context.IngredientTypes.OrderBy(x => x.Name).ToListAsync();
    }
}
