using Barkeeper.Models.Database;

namespace Barkeeper.Services.Interfaces;

public interface IIngredientService {
    Task<Ingredient> SaveIngredient(Ingredient Ingredient);
    Task<ICollection<Ingredient>> GetIngredients();
    Task<ICollection<IngredientType>> GetIngredientTypes();
}
