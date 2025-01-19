using Barkeeper.Data.Interfaces;
using Barkeeper.Models.Database;
using Barkeeper.Models.Utility;
using Microsoft.EntityFrameworkCore;

namespace Barkeeper.Data.Repositories;

public class CocktailRepository(BarkeeperContext Context) : BaseRepository(Context), ICocktailRepository {
    public async Task<PagedResult<Cocktail>> GetRecentCocktails(PagingOptions Options) {
        var query = context.Cocktails.OrderByDescending(c => c.CreatedAt).AsQueryable();

        var count = await query.CountAsync();
        var cocktails = await query
            .Skip(Options.Page * Options.PageSize)
            .Take(Options.PageSize)
            .ToListAsync();

        return new PagedResult<Cocktail>(
            Options.Page,
            Options.PageSize,
            count,
            cocktails,
            ["CreatedAt"],
            Options.SortDirection
         );

    }
}
