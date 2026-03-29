using Barkeeper.Data.Interfaces;
using Barkeeper.Models.Database;
using Barkeeper.Services.Interfaces;

namespace Barkeeper.Services;

public class BarService(IBarRepository BarRepository) : IBarService {
    private readonly IBarRepository barRepository = BarRepository;

    public async Task<ICollection<UserIngredient>> GetUserIngredients(string userId) {
        return await barRepository.GetUserIngredients(userId);
    }

    public async Task<UserIngredient> AddIngredient(string userId, int ingredientId) {
        return await barRepository.AddIngredient(userId, ingredientId);
    }

    public async Task RemoveIngredient(string userId, int ingredientId) {
        await barRepository.RemoveIngredient(userId, ingredientId);
    }

    public async Task<ICollection<UserProduct>> GetUserProducts(string userId) {
        return await barRepository.GetUserProducts(userId);
    }

    public async Task<UserProduct> AddUserProduct(string userId, int productId) {
        return await barRepository.AddUserProduct(userId, productId);
    }

    public async Task RemoveUserProduct(string userId, int productId) {
        await barRepository.RemoveUserProduct(userId, productId);
    }
}
