using Barkeeper.Models.Database;

namespace Barkeeper.Data.Interfaces;

public interface IIngredientRepository : IBaseRepository {
    Task<Ingredient> SaveIngredient(Ingredient Ingredient);

    Task<ICollection<Ingredient>> GetIngredients();
    Task<ICollection<IngredientType>> GetIngredientTypes();
}
