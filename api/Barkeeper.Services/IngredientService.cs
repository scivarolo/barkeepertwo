using Barkeeper.Data.Interfaces;
using Barkeeper.Models.Database;
using Barkeeper.Models.Request;
using Barkeeper.Services.Interfaces;

public class IngredientService(IIngredientRepository ingredientRepository) : IIngredientService {
    public async Task<Ingredient?> GetIngredient(int Id) {
        return await ingredientRepository.GetById<Ingredient>(Id);
    }

    public async Task<ICollection<Ingredient>> GetIngredients() {
        return await ingredientRepository.GetIngredients();
    }

    public async Task<ICollection<IngredientType>> GetIngredientTypes() {
        return await ingredientRepository.GetIngredientTypes();
    }

    public async Task<Ingredient?> SaveIngredient(IngredientRequest Ingredient) {
        return await ingredientRepository.SaveIngredient(Ingredient);
    }
}
