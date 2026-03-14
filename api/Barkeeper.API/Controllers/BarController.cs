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
}
