using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Barkeeper.Models.Request;
using Microsoft.EntityFrameworkCore;

namespace Barkeeper.Models.Database;

[Table("Ingredient")]
[Index("Name", Name = "Ingredient_name_key", IsUnique = true)]
public partial class Ingredient {
    public Ingredient() { }
    public Ingredient(IngredientRequest Request) {
        Id = Request.Id;
        Name = Request.Name;
        CreatedById = Request.CreatedById;

    }

    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("name")]
    public string Name { get; set; } = null!;

    [Column("createdById")]
    public string CreatedById { get; set; } = null!;

    [Column("createdAt", TypeName = "timestamp(3) without time zone")]
    public DateTime CreatedAt { get; set; }

    [Column("updatedAt", TypeName = "timestamp(3) without time zone")]
    public DateTime UpdatedAt { get; set; }

    [Column("ingredientTypeId")]
    public int? IngredientTypeId { get; set; }

    [InverseProperty("Ingredient")]
    public virtual ICollection<CocktailIngredient> CocktailIngredients { get; set; } = new List<CocktailIngredient>();

    [ForeignKey("CreatedById")]
    [InverseProperty("Ingredients")]
    public virtual User CreatedBy { get; set; } = null!;

    [ForeignKey("IngredientTypeId")]
    [InverseProperty("Ingredients")]
    public virtual IngredientType? IngredientType { get; set; }

    [InverseProperty("Ingredient")]
    public virtual ICollection<Product> Products { get; set; } = new List<Product>();

    [InverseProperty("Ingredient")]
    public virtual ICollection<ShoppingItem> ShoppingItems { get; set; } = new List<ShoppingItem>();

    [InverseProperty("Ingredient")]
    public virtual ICollection<UserIngredient> UserIngredients { get; set; } = new List<UserIngredient>();
}
