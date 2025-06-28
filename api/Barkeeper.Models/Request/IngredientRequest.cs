namespace Barkeeper.Models.Request;

public class IngredientRequest {
    public int Id { get; set; }
    public string? Name { get; set; }
    public string? CreatedById { get; set; }
    public int? IngredientTypeId { get; set; }
}
