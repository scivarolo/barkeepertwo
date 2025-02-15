using Barkeeper.Models.Database;
using Barkeeper.Models.Request;

namespace Barkeeper.Services.Interfaces;

public interface IIngredientService {
    Task<Ingredient?> SaveIngredient(IngredientRequest Ingredient);
    Task<ICollection<Ingredient>> GetIngredients();
    Task<ICollection<IngredientType>> GetIngredientTypes();
    Task<Ingredient?> GetIngredient(int id);
}
