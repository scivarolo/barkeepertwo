using Barkeeper.Models.Database;
using Barkeeper.Models.Utility;
using Barkeeper.Services.Interfaces;

namespace Barkeeper.API.Controllers;

public class CocktailController(ICocktailService CocktailService) : BarkeeperControllerBase {

    private readonly ICocktailService cocktailService = CocktailService;

    public async Task<PagedResult<Cocktail>> RecentCocktails(int Quantity = 10, int Page = 1) {
        var cocktails = await cocktailService.GetRecentCocktails(Quantity, Page);
        return cocktails;
    }
}
