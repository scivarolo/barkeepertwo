using Barkeeper.Data.Interfaces;
using Barkeeper.Models.Database;
using Barkeeper.Models.Request;
using Microsoft.EntityFrameworkCore;

namespace Barkeeper.Data.Repositories;

public class IngredientRepository(BarkeeperContext Context) : BaseRepository(Context), IIngredientRepository {
    public async Task<Ingredient?> SaveIngredient(IngredientRequest Ingredient) {
        if (Ingredient.Id == default) {
            // Create
            var exists = context.Ingredients.Any(i => i.Name == Ingredient.Name);
            if (exists) {
                throw new Exception("An ingredient with this name already exists.");
            }

            var ingredient = new Ingredient {
                Name = Ingredient.Name,
                CreatedById = Ingredient.CreatedById,
                IngredientTypeId = Ingredient.IngredientTypeId,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now
            };

            context.Ingredients.Add(ingredient);
            await context.SaveChangesAsync();
            await context.Entry(ingredient).Reference(i => i.IngredientType).LoadAsync();
            return ingredient;
        } else {
            // Update
            var ingredient = await context.Ingredients.FindAsync(Ingredient.Id);
            if (ingredient == null) {
                throw new Exception("Ingredient not found");
            }

            ingredient.Name = Ingredient.Name;
            ingredient.IngredientTypeId = Ingredient.IngredientTypeId;
            ingredient.UpdatedAt = DateTime.Now;

            context.Ingredients.Update(ingredient);
            await context.SaveChangesAsync();
            await context.Entry(ingredient).Reference(i => i.IngredientType).LoadAsync();
            return ingredient;
        }
    }

    public async Task<ICollection<Ingredient>> GetIngredients() {
        return await context.Ingredients
            .Include(i => i.IngredientType)
            .OrderBy(x => x.Name)
            .ToListAsync();
    }

    public async Task<ICollection<IngredientType>> GetIngredientTypes() {
        return await context.IngredientTypes.OrderBy(x => x.Name).ToListAsync();
    }
}
