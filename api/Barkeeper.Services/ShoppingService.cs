using Barkeeper.Data.Interfaces;
using Barkeeper.Models.Database;
using Barkeeper.Models.Request;
using Barkeeper.Services.Interfaces;

namespace Barkeeper.Services;

public class ShoppingService(IShoppingRepository ShoppingRepository) : IShoppingService {
    private readonly IShoppingRepository _shoppingRepository = ShoppingRepository;

    public async Task<ICollection<ShoppingItem>> GetItems(string userId) {
        return await _shoppingRepository.GetItems(userId);
    }

    public async Task<ShoppingItem> AddItem(AddShoppingItemRequest request, string userId) {
        return await _shoppingRepository.AddItem(request, userId);
    }

    public async Task RemoveItem(int id, string userId) {
        await _shoppingRepository.RemoveItem(id, userId);
    }

    public async Task PurchaseItem(int id, string userId) {
        await _shoppingRepository.PurchaseItem(id, userId);
    }
}
