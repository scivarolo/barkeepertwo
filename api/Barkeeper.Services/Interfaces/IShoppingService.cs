using Barkeeper.Models.Database;
using Barkeeper.Models.Request;

namespace Barkeeper.Services.Interfaces;

public interface IShoppingService {
    Task<ICollection<ShoppingItem>> GetItems(string userId);
    Task<ShoppingItem> AddItem(AddShoppingItemRequest request, string userId);
    Task RemoveItem(int id, string userId);
    Task PurchaseItem(int id, string userId);
}
