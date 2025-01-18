namespace Barkeeper.Data.Interfaces;

public interface IBaseRepository {
    public Task<T?> GetById<T>(int Id) where T : class;
}
