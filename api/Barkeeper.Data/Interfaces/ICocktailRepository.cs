using Barkeeper.Models.Database;
using Barkeeper.Models.Request;
using Barkeeper.Models.Utility;

namespace Barkeeper.Data.Interfaces;

public interface ICocktailRepository : IBaseRepository {
    Task<PagedResult<Cocktail>> GetRecentCocktails(PagingOptions Options);

    Task<Cocktail?> GetFullCocktail(int Id);

    Task<int> GetCountForCocktail(int CocktailId, int DaysAgo = 30);

    Task<Cocktail> CreateCocktail(string createdById, CreateCocktailRequest request);
}
