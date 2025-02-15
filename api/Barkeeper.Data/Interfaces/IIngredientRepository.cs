using Barkeeper.Models.Database;
using Barkeeper.Models.Request;

namespace Barkeeper.Data.Interfaces;

public interface IIngredientRepository : IBaseRepository {
    Task<Ingredient?> SaveIngredient(IngredientRequest Ingredient);

    Task<ICollection<Ingredient>> GetIngredients();
    Task<ICollection<IngredientType>> GetIngredientTypes();
}
