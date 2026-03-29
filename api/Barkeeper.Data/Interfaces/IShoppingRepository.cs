using Barkeeper.Models.Database;
using Barkeeper.Models.Request;

namespace Barkeeper.Data.Interfaces;

public interface IShoppingRepository : IBaseRepository {
    Task<ICollection<ShoppingItem>> GetItems(string userId);
    Task<ShoppingItem> AddItem(AddShoppingItemRequest request, string userId);
    Task RemoveItem(int id, string userId);
    Task PurchaseItem(int id, string userId);
}
