using Barkeeper.API.Extensions.Authorization;
using Barkeeper.Models.Database;
using Barkeeper.Models.Request;
using Barkeeper.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Barkeeper.API.Controllers;

public class ProductController(IProductService ProductService) : BarkeeperControllerBase {
    private readonly IProductService productService = ProductService;

    [HttpGet]
    public async Task<ICollection<Product>> GetProductsForIngredient([FromQuery] int IngredientId) {
        return await productService.GetProductsForIngredient(IngredientId);
    }

    [HttpPost]
    public async Task<Product> SaveProduct([FromBody] SaveProductRequest request) {
        // For updates (Id != 0), require admin permission
        if (request.Id != 0 && !UserHasPermission("admin")) {
            throw new UnauthorizedAccessException("Only admins can update products");
        }

        return await productService.SaveProduct(request, CurrentUserId);
    }

    [HttpGet]
    [Authorize(AuthPolicy.Admin)]
    public async Task<ICollection<Product>> GetAll() {
        return await productService.GetAllProducts();
    }
}
