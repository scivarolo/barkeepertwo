using Barkeeper.API.Controllers;
using Barkeeper.Models.Database;
using Barkeeper.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

public class IngredientController(IIngredientService ingredientService) : BarkeeperControllerBase {

    [HttpPost]
    public async Task<Ingredient> SaveIngredient([FromBody] Ingredient Ingredient) {
        return await ingredientService.SaveIngredient(Ingredient);
    }

    [HttpGet]
    public async Task<ICollection<Ingredient>> GetIngredients() {
        return await ingredientService.GetIngredients();
    }

    [HttpGet]
    public async Task<ICollection<IngredientType>> GetIngredientTypes() {
        return await ingredientService.GetIngredientTypes();
    }
}
