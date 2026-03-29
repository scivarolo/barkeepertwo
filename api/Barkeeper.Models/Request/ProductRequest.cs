namespace Barkeeper.Models.Request;

public class SaveProductRequest {
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public int IngredientId { get; set; }
    public string? Size { get; set; }
}
