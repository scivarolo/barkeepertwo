using Barkeeper.Data.Interfaces;
using Barkeeper.Models.Database;
using Barkeeper.Models.Utility;
using Barkeeper.Models.ViewModels;
using Barkeeper.Services.Interfaces;

namespace Barkeeper.Services;

public class CocktailService(ICocktailRepository CocktailRepo) : ICocktailService {
    private readonly ICocktailRepository cocktailRepo = CocktailRepo;

    public async Task<PagedResult<Cocktail>> GetRecentCocktails(PagingOptions Options) {
        return await cocktailRepo.GetRecentCocktails(Options);
    }

    public async Task<Cocktail?> GetCocktailById(int Id) {
        return await cocktailRepo.GetById<Cocktail>(Id);
    }

    public async Task<CocktailViewModel?> GetCocktailView(int CocktailId) {
        var cocktail = await cocktailRepo.GetFullCocktail(CocktailId);
        if (cocktail == null) {
            return null;
        }

        var count = await cocktailRepo.GetCountForCocktail(CocktailId);
        return new CocktailViewModel(cocktail, count);
    }
}
