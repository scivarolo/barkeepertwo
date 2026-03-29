namespace Barkeeper.Models.Request;

public class CocktailIngredientRequest {
    public int IngredientId { get; set; }
    public decimal Amount { get; set; }
    public string Units { get; set; } = null!;
    public int? ProductId { get; set; }
}

public class CreateCocktailRequest {
    public string Name { get; set; } = null!;
    public string? Instructions { get; set; }
    public string? Notes { get; set; }
    public List<CocktailIngredientRequest> Ingredients { get; set; } = new();
}
