using System.Threading.Tasks;
using Barkeeper.Models.Database;

namespace Barkeeper.Data.Interfaces;

public interface IUserRepository {
    Task<User?> Get(string Id);
}
