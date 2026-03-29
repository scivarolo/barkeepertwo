using Barkeeper.Models.Database;
using Barkeeper.Models.Request;

namespace Barkeeper.Data.Interfaces;

public interface IProductRepository : IBaseRepository {
    Task<ICollection<Product>> GetProductsForIngredient(int ingredientId);
    Task<Product> SaveProduct(SaveProductRequest request, string userId);
    Task<ICollection<Product>> GetAllProducts();
}
