using Barkeeper.API.Extensions.Authorization;
using Barkeeper.Models.Database;
using Barkeeper.Models.Request;
using Barkeeper.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Barkeeper.API.Controllers {
    public class IngredientController(IIngredientService ingredientService) : BarkeeperControllerBase {

        [HttpPost]
        [Authorize(AuthPolicy.Admin)]
        [Produces("application/json")]
        public async Task<Ingredient?> SaveIngredient([FromBody] IngredientRequest Ingredient) {
            if (Ingredient.Id == default) {
                Ingredient.CreatedById = CurrentUserId;
            }
            var ingredient = await ingredientService.SaveIngredient(Ingredient);
            return ingredient;
        }

        public async Task<Ingredient?> Get(int Id) {
            return await ingredientService.GetIngredient(Id);
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
}
