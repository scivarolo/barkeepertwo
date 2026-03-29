using Barkeeper.Data.Interfaces;
using Barkeeper.Models.Database;
using Microsoft.EntityFrameworkCore;

namespace Barkeeper.Data.Repositories;

public class BarRepository(BarkeeperContext Context) : BaseRepository(Context), IBarRepository {
    public async Task<ICollection<UserIngredient>> GetUserIngredients(string userId) {
        return await context.UserIngredients
            .Where(ui => ui.UserId == userId)
            .Include(ui => ui.Ingredient)
                .ThenInclude(i => i.IngredientType)
            .OrderBy(ui => ui.Ingredient.Name)
            .ToListAsync();
    }

    public async Task<UserIngredient> AddIngredient(string userId, int ingredientId) {
        var exists = await context.UserIngredients
            .AnyAsync(ui => ui.UserId == userId && ui.IngredientId == ingredientId);

        if (exists) {
            var existing = await context.UserIngredients
                .Include(ui => ui.Ingredient)
                    .ThenInclude(i => i.IngredientType)
                .FirstOrDefaultAsync(ui => ui.UserId == userId && ui.IngredientId == ingredientId);
            return existing!;
        }

        var userIngredient = new UserIngredient {
            UserId = userId,
            IngredientId = ingredientId,
            DateAdded = DateTime.Now
        };

        context.UserIngredients.Add(userIngredient);
        await context.SaveChangesAsync();

        await context.Entry(userIngredient).Reference(ui => ui.Ingredient).LoadAsync();
        await context.Entry(userIngredient.Ingredient).Reference(i => i.IngredientType).LoadAsync();

        return userIngredient;
    }

    public async Task RemoveIngredient(string userId, int ingredientId) {
        var userIngredient = await context.UserIngredients
            .FirstOrDefaultAsync(ui => ui.UserId == userId && ui.IngredientId == ingredientId);

        if (userIngredient != null) {
            context.UserIngredients.Remove(userIngredient);
            await context.SaveChangesAsync();
        }
    }

    public async Task<ICollection<UserProduct>> GetUserProducts(string userId) {
        return await context.UserProducts
            .Where(up => up.UserId == userId)
            .Include(up => up.Product)
                .ThenInclude(p => p.Ingredient)
            .OrderBy(up => up.Product.Name)
            .ToListAsync();
    }

    public async Task<UserProduct> AddUserProduct(string userId, int productId) {
        // Ensure the ingredient is in the bar
        var product = await context.Products.FindAsync(productId);
        if (product == null) {
            throw new Exception("Product not found");
        }

        await AddIngredient(userId, product.IngredientId);

        // Check if product is already in bar
        var exists = await context.UserProducts
            .AnyAsync(up => up.UserId == userId && up.ProductId == productId);

        if (exists) {
            var existing = await context.UserProducts
                .Include(up => up.Product)
                    .ThenInclude(p => p.Ingredient)
                .FirstOrDefaultAsync(up => up.UserId == userId && up.ProductId == productId);
            return existing!;
        }

        var userProduct = new UserProduct {
            UserId = userId,
            ProductId = productId,
            DateAdded = DateTime.Now
        };

        context.UserProducts.Add(userProduct);
        await context.SaveChangesAsync();

        await context.Entry(userProduct).Reference(up => up.Product).LoadAsync();
        await context.Entry(userProduct.Product).Reference(p => p.Ingredient).LoadAsync();

        return userProduct;
    }

    public async Task RemoveUserProduct(string userId, int productId) {
        var userProduct = await context.UserProducts
            .FirstOrDefaultAsync(up => up.UserId == userId && up.ProductId == productId);

        if (userProduct != null) {
            context.UserProducts.Remove(userProduct);
            await context.SaveChangesAsync();
        }
    }
}
