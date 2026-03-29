using Barkeeper.Data.Interfaces;
using Barkeeper.Models.Database;
using Barkeeper.Models.Request;
using Barkeeper.Services.Interfaces;

namespace Barkeeper.Services;

public class ProductService(IProductRepository ProductRepository) : IProductService {
    private readonly IProductRepository productRepository = ProductRepository;

    public async Task<ICollection<Product>> GetProductsForIngredient(int ingredientId) {
        return await productRepository.GetProductsForIngredient(ingredientId);
    }

    public async Task<Product> SaveProduct(SaveProductRequest request, string userId) {
        return await productRepository.SaveProduct(request, userId);
    }

    public async Task<ICollection<Product>> GetAllProducts() {
        return await productRepository.GetAllProducts();
    }
}
