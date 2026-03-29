using Barkeeper.Data.Interfaces;
using Barkeeper.Models.Database;
using Barkeeper.Models.Request;
using Microsoft.EntityFrameworkCore;

namespace Barkeeper.Data.Repositories;

public class ShoppingRepository(BarkeeperContext Context, IBarRepository BarRepository) : BaseRepository(Context), IShoppingRepository {
    private readonly IBarRepository _barRepository = BarRepository;

    public async Task<ICollection<ShoppingItem>> GetItems(string userId) {
        return await context.ShoppingItems
            .Where(si => si.UserId == userId)
            .Include(si => si.Ingredient)
            .Include(si => si.Product!)
                .ThenInclude(p => p!.Ingredient)
            .OrderByDescending(si => si.DateAdded)
            .ToListAsync();
    }

    public async Task<ShoppingItem> AddItem(AddShoppingItemRequest request, string userId) {
        var existing = await context.ShoppingItems
            .FirstOrDefaultAsync(si => si.UserId == userId &&
                ((request.IngredientId.HasValue && si.IngredientId == request.IngredientId) ||
                 (request.ProductId.HasValue && si.ProductId == request.ProductId)));

        if (existing != null) {
            existing.Quantity += request.Quantity;
            existing.DateAdded = DateTime.Now;
            await context.SaveChangesAsync();

            await context.Entry(existing).Reference(si => si.Ingredient).LoadAsync();
            if (existing.Product != null) {
                await context.Entry(existing).Reference(si => si.Product).LoadAsync();
                await context.Entry(existing.Product).Reference(p => p.Ingredient).LoadAsync();
            }

            return existing;
        }

        var shoppingItem = new ShoppingItem {
            UserId = userId,
            IngredientId = request.IngredientId,
            ProductId = request.ProductId,
            Quantity = request.Quantity,
            DateAdded = DateTime.Now
        };

        context.ShoppingItems.Add(shoppingItem);
        await context.SaveChangesAsync();

        await context.Entry(shoppingItem).Reference(si => si.Ingredient).LoadAsync();
        if (shoppingItem.Product != null) {
            await context.Entry(shoppingItem).Reference(si => si.Product).LoadAsync();
            await context.Entry(shoppingItem.Product).Reference(p => p.Ingredient).LoadAsync();
        }

        return shoppingItem;
    }

    public async Task RemoveItem(int id, string userId) {
        var shoppingItem = await context.ShoppingItems.FindAsync(id);

        if (shoppingItem != null && shoppingItem.UserId == userId) {
            context.ShoppingItems.Remove(shoppingItem);
            await context.SaveChangesAsync();
        }
    }

    public async Task PurchaseItem(int id, string userId) {
        var shoppingItem = await context.ShoppingItems.FindAsync(id);

        if (shoppingItem == null || shoppingItem.UserId != userId) {
            return;
        }

        if (shoppingItem.ProductId.HasValue) {
            await _barRepository.AddUserProduct(userId, shoppingItem.ProductId.Value);
        } else if (shoppingItem.IngredientId.HasValue) {
            await _barRepository.AddIngredient(userId, shoppingItem.IngredientId.Value);
        }

        context.ShoppingItems.Remove(shoppingItem);
        await context.SaveChangesAsync();
    }
}
