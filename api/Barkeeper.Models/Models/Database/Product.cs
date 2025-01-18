using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Barkeeper.Models.Database;

[Table("Product")]
public partial class Product {
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("name")]
    public string Name { get; set; } = null!;

    [Column("ingredientId")]
    public int IngredientId { get; set; }

    [Column("createdById")]
    public string CreatedById { get; set; } = null!;

    [Column("createdAt", TypeName = "timestamp(3) without time zone")]
    public DateTime CreatedAt { get; set; }

    [Column("updatedAt", TypeName = "timestamp(3) without time zone")]
    public DateTime UpdatedAt { get; set; }

    [InverseProperty("Product")]
    public virtual ICollection<CocktailIngredient> CocktailIngredients { get; set; } = new List<CocktailIngredient>();

    [ForeignKey("CreatedById")]
    [InverseProperty("Products")]
    public virtual User CreatedBy { get; set; } = null!;

    [ForeignKey("IngredientId")]
    [InverseProperty("Products")]
    public virtual Ingredient Ingredient { get; set; } = null!;

    [InverseProperty("Product")]
    public virtual ICollection<ShoppingItem> ShoppingItems { get; set; } = new List<ShoppingItem>();

    [InverseProperty("Product")]
    public virtual ICollection<UserProduct> UserProducts { get; set; } = new List<UserProduct>();
}
