using Barkeeper.Models.Database;
using Barkeeper.Models.Utility;
using Barkeeper.Models.ViewModels;

namespace Barkeeper.Services.Interfaces;
public interface ICocktailService {
    Task<PagedResult<Cocktail>> GetRecentCocktails(PagingOptions Options);

    Task<Cocktail?> GetCocktailById(int Id);

    Task<CocktailViewModel?> GetCocktailView(int CocktailId);
}
