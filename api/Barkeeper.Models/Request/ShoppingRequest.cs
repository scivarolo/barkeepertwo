namespace Barkeeper.Models.Request;

public class AddShoppingItemRequest {
    public int? IngredientId { get; set; }
    public int? ProductId { get; set; }
    public int Quantity { get; set; }
}

public class RemoveShoppingItemRequest {
    public int Id { get; set; }
}
