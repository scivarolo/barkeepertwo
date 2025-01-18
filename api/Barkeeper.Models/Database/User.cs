using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Barkeeper.Models.Database;

[Table("User")]
[Index("DisplayName", Name = "User_displayName_key", IsUnique = true)]
public partial class User {

    [Key]
    [Column("id")]
    public string Id { get; set; } = null!;

    [Column("createdAt", TypeName = "timestamp(3) without time zone")]
    public DateTime CreatedAt { get; set; }

    [Column("updatedAt", TypeName = "timestamp(3) without time zone")]
    public DateTime UpdatedAt { get; set; }

    [Column("displayName")]
    public string? DisplayName { get; set; }

    [InverseProperty("CreatedBy")]
    public virtual ICollection<Cocktail> Cocktails { get; set; } = new List<Cocktail>();

    [InverseProperty("CreatedBy")]
    public virtual ICollection<Ingredient> Ingredients { get; set; } = new List<Ingredient>();

    [InverseProperty("CreatedBy")]
    public virtual ICollection<Product> Products { get; set; } = new List<Product>();

    [InverseProperty("User")]
    public virtual ICollection<ShoppingItem> ShoppingItems { get; set; } = new List<ShoppingItem>();

    [InverseProperty("User")]
    public virtual ICollection<TabCocktail> TabCocktails { get; set; } = new List<TabCocktail>();

    [InverseProperty("User")]
    public virtual ICollection<UserCocktail> UserCocktails { get; set; } = new List<UserCocktail>();

    [InverseProperty("User")]
    public virtual ICollection<UserHistory> UserHistories { get; set; } = new List<UserHistory>();

    [InverseProperty("User")]
    public virtual ICollection<UserIngredient> UserIngredients { get; set; } = new List<UserIngredient>();

    [InverseProperty("User")]
    public virtual ICollection<UserProduct> UserProducts { get; set; } = new List<UserProduct>();
}
