using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Barkeeper.Models.Database;
using GreenDonut;
using Microsoft.EntityFrameworkCore;

namespace Barkeeper.Data.DataLoaders;

public class CocktailIngredientDataLoader : BatchDataLoader<int, CocktailIngredient> {
    private readonly BarkeeperContext context;
    public CocktailIngredientDataLoader(BarkeeperContext Context, IBatchScheduler BatchScheduler, DataLoaderOptions? Options = null) : base(BatchScheduler, Options) {
        context = Context;
    }

    protected override async Task<IReadOnlyDictionary<int, CocktailIngredient>> LoadBatchAsync(
        IReadOnlyList<int> Keys,
        CancellationToken CancellationToken
    ) {
        var cockatilIngredients = await context.CocktailIngredients.Where(x => Keys.Contains(x.Id)).ToListAsync();
        return cockatilIngredients.ToDictionary(x => x.Id);
    }
}

public class IngredientDataLoader : BatchDataLoader<int, Ingredient> {
    private readonly BarkeeperContext context;
    public IngredientDataLoader(BarkeeperContext Context, IBatchScheduler BatchScheduler, DataLoaderOptions? Options = null) : base(BatchScheduler, Options) {
        context = Context;
    }

    protected override async Task<IReadOnlyDictionary<int, Ingredient>> LoadBatchAsync(
        IReadOnlyList<int> Keys,
        CancellationToken CancellationToken
    ) {
        var ingredients = await context.Ingredients.Where(x => Keys.Contains(x.Id)).ToListAsync();
        return ingredients.ToDictionary(x => x.Id);
    }
}
