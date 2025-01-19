using Barkeeper.Models.Database;
using Barkeeper.Models.Utility;
using Barkeeper.Models.ViewModels;
using Barkeeper.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Barkeeper.API.Controllers;


public class CocktailController(ICocktailService CocktailService) : BarkeeperControllerBase {

    private readonly ICocktailService cocktailService = CocktailService;

    [HttpGet]
    public async Task<PagedResult<Cocktail>> RecentCocktails([FromQuery] PagingOptions Options) {
        var cocktails = await cocktailService.GetRecentCocktails(Options);
        return cocktails;
    }

    [HttpGet]
    public async Task<CocktailViewModel?> GetCocktail([FromQuery] int Id) {
        var cocktail = await cocktailService.GetCocktailView(Id);
        return cocktail;
    }
}
