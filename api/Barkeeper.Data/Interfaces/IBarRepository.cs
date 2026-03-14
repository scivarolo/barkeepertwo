using Barkeeper.Models.Database;

namespace Barkeeper.Data.Interfaces;

public interface IBarRepository : IBaseRepository {
    Task<ICollection<UserIngredient>> GetUserIngredients(string userId);
    Task<UserIngredient> AddIngredient(string userId, int ingredientId);
    Task RemoveIngredient(string userId, int ingredientId);
}
