using Barkeeper.Models.Database;
using Barkeeper.Models.Request;
using Barkeeper.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Barkeeper.API.Controllers;

public class BarController(IBarService BarService) : BarkeeperControllerBase {
    private readonly IBarService barService = BarService;

    [HttpGet]
    public async Task<ICollection<UserIngredient>> GetIngredients() {
        return await barService.GetUserIngredients(CurrentUserId);
    }

    [HttpPost]
    public async Task<UserIngredient> AddIngredient([FromBody] BarIngredientRequest request) {
        return await barService.AddIngredient(CurrentUserId, request.IngredientId);
    }

    [HttpPost]
    public async Task RemoveIngredient([FromBody] BarIngredientRequest request) {
        await barService.RemoveIngredient(CurrentUserId, request.IngredientId);
    }

    [HttpGet]
    public async Task<ICollection<UserProduct>> GetProducts() {
        return await barService.GetUserProducts(CurrentUserId);
    }

    [HttpPost]
    public async Task<UserProduct> AddProduct([FromBody] BarProductRequest request) {
        return await barService.AddUserProduct(CurrentUserId, request.ProductId);
    }

    [HttpPost]
    public async Task RemoveProduct([FromBody] BarProductRequest request) {
        await barService.RemoveUserProduct(CurrentUserId, request.ProductId);
    }
}
