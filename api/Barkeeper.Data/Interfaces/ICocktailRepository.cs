using Barkeeper.Models.Database;
using Barkeeper.Models.Utility;

namespace Barkeeper.Data.Interfaces;

public interface ICocktailRepository : IBaseRepository {
    Task<PagedResult<Cocktail>> GetRecentCocktails(int quantity, int page);
}
