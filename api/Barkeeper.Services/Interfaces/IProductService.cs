using Barkeeper.Models.Database;
using Barkeeper.Models.Request;

namespace Barkeeper.Services.Interfaces;

public interface IProductService {
    Task<ICollection<Product>> GetProductsForIngredient(int ingredientId);
    Task<Product> SaveProduct(SaveProductRequest request, string userId);
    Task<ICollection<Product>> GetAllProducts();
}
