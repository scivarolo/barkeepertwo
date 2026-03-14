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
}
