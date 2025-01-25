using Barkeeper.Data.Interfaces;
using Barkeeper.Models.Database;
using Barkeeper.Services.Interfaces;

public class IngredientService(IIngredientRepository ingredientRepository) : IIngredientService {
    public async Task<ICollection<Ingredient>> GetIngredients() {
        return await ingredientRepository.GetIngredients();
    }

    public async Task<ICollection<IngredientType>> GetIngredientTypes() {
        return await ingredientRepository.GetIngredientTypes();
    }

    public async Task<Ingredient> SaveIngredient(Ingredient Ingredient) {
        return await ingredientRepository.SaveIngredient(Ingredient);
    }
}
