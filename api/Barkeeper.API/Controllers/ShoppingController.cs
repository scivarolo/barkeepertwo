using Barkeeper.Models.Database;
using Barkeeper.Models.Request;
using Barkeeper.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Barkeeper.API.Controllers;

public class ShoppingController(IShoppingService ShoppingService) : BarkeeperControllerBase {
    private readonly IShoppingService _shoppingService = ShoppingService;

    [HttpGet]
    public async Task<ICollection<ShoppingItem>> GetItems() {
        return await _shoppingService.GetItems(CurrentUserId);
    }

    [HttpPost]
    public async Task<ShoppingItem> AddItem([FromBody] AddShoppingItemRequest request) {
        return await _shoppingService.AddItem(request, CurrentUserId);
    }

    [HttpPost]
    public async Task RemoveItem([FromBody] RemoveShoppingItemRequest request) {
        await _shoppingService.RemoveItem(request.Id, CurrentUserId);
    }

    [HttpPost]
    public async Task PurchaseItem([FromBody] RemoveShoppingItemRequest request) {
        await _shoppingService.PurchaseItem(request.Id, CurrentUserId);
    }
}
