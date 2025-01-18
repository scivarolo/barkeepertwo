using System.Threading.Tasks;
using Barkeeper.Data.Interfaces;
using Barkeeper.Models.Database;
using Barkeeper.Models.Utility;
using Microsoft.EntityFrameworkCore;

namespace Barkeeper.Data.Repositories;

public class CocktailRepository(BarkeeperContext Context) : BaseRepository(Context), ICocktailRepository {
    public async Task<PagedResult<Cocktail>> GetRecentCocktails(int Quantity = 10, int Page = 0) {
        var query = context.Cocktails.OrderByDescending(c => c.CreatedAt).AsQueryable();

        var count = await query.CountAsync();
        var cocktails = await query
            .Skip(Page * Quantity)
            .Take(Quantity)
            .ToListAsync();

        return new PagedResult<Cocktail>(
            Page,
            Quantity,
            count,
            cocktails,
            ["CreatedAt"],
            SortDirection.Descending
         );

    }
}
