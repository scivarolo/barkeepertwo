using Barkeeper.Data.Interfaces;
using Barkeeper.Models.Database;
using Barkeeper.Models.Utility;
using Barkeeper.Services.Interfaces;

namespace Barkeeper.Services;

public class CocktailService(ICocktailRepository CocktailRepo) : ICocktailService {
    private readonly ICocktailRepository cocktailRepo = CocktailRepo;

    public async Task<PagedResult<Cocktail>> GetRecentCocktails(int Quantity = 10, int Page = 0) {
        return await cocktailRepo.GetRecentCocktails(Quantity, Page);
    }

    public async Task<Cocktail?> GetCocktailById(int Id) {
        return await cocktailRepo.GetById<Cocktail>(Id);
    }
}
