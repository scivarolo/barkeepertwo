using Barkeeper.Models.Database;

namespace Barkeeper.Services.Interfaces;

public interface IBarService {
    Task<ICollection<UserIngredient>> GetUserIngredients(string userId);
    Task<UserIngredient> AddIngredient(string userId, int ingredientId);
    Task RemoveIngredient(string userId, int ingredientId);
    Task<ICollection<UserProduct>> GetUserProducts(string userId);
    Task<UserProduct> AddUserProduct(string userId, int productId);
    Task RemoveUserProduct(string userId, int productId);
}
