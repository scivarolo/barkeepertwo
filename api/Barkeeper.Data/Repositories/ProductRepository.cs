using Barkeeper.Data.Interfaces;
using Barkeeper.Models.Database;
using Barkeeper.Models.Request;
using Microsoft.EntityFrameworkCore;

namespace Barkeeper.Data.Repositories;

public class ProductRepository(BarkeeperContext Context) : BaseRepository(Context), IProductRepository {
    public async Task<ICollection<Product>> GetProductsForIngredient(int ingredientId) {
        return await context.Products
            .Where(p => p.IngredientId == ingredientId)
            .Include(p => p.Ingredient)
            .OrderBy(p => p.Name)
            .ToListAsync();
    }

    public async Task<Product> SaveProduct(SaveProductRequest request, string userId) {
        if (request.Id == 0) {
            // Check for existing product (case-insensitive duplicate)
            var existing = await context.Products
                .FirstOrDefaultAsync(p =>
                    p.Name.ToLower() == request.Name.ToLower() &&
                    p.IngredientId == request.IngredientId &&
                    p.Size == request.Size);

            if (existing != null) {
                return existing;
            }

            // Create new product
            var product = new Product {
                Name = request.Name,
                IngredientId = request.IngredientId,
                Size = request.Size,
                CreatedById = userId,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now
            };

            context.Products.Add(product);
            await context.SaveChangesAsync();
            await context.Entry(product).Reference(p => p.Ingredient).LoadAsync();

            return product;
        } else {
            // Update existing product
            var product = await context.Products.FindAsync(request.Id);
            if (product == null) {
                throw new Exception("Product not found");
            }

            product.Name = request.Name;
            product.Size = request.Size;
            product.UpdatedAt = DateTime.Now;

            context.Products.Update(product);
            await context.SaveChangesAsync();
            await context.Entry(product).Reference(p => p.Ingredient).LoadAsync();

            return product;
        }
    }

    public async Task<ICollection<Product>> GetAllProducts() {
        return await context.Products
            .Include(p => p.Ingredient)
            .OrderBy(p => p.Ingredient.Name)
            .ThenBy(p => p.Name)
            .ToListAsync();
    }
}
