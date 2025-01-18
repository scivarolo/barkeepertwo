using Barkeeper.Models.Database;
using Barkeeper.Models.Utility;

namespace Barkeeper.Services.Interfaces;
public interface ICocktailService {
    Task<PagedResult<Cocktail>> GetRecentCocktails(int Quantity = 10, int Page = 0);

}
