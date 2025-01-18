using Barkeeper.Data.Interfaces;

namespace Barkeeper.Data.Repositories;

public class BaseRepository(BarkeeperContext Context) : IBaseRepository {
    protected readonly BarkeeperContext context = Context;

    public async Task<TEntity?> GetById<TEntity>(int Id) where TEntity : class {
        return await context.Set<TEntity>().FindAsync(Id);
    }
}
