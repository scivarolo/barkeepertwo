using Barkeeper.Models.Database;
using Barkeeper.Models.Utility;

namespace Barkeeper.Services.Interfaces;
public interface ICocktailService {
    Task<PagedResult<Cocktail>> GetRecentCocktails(PagingOptions Options);

}
