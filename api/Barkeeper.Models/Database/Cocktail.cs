using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Barkeeper.Models.Database;

[Table("Cocktail")]
public partial class Cocktail {
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("name")]
    public string Name { get; set; } = null!;

    [Column("instructions")]
    public string? Instructions { get; set; }

    [Column("notes")]
    public string? Notes { get; set; }

    [Column("createdById")]
    public string CreatedById { get; set; } = null!;

    [Column("createdAt", TypeName = "timestamp(3) without time zone")]
    public DateTime CreatedAt { get; set; }

    [Column("updatedAt", TypeName = "timestamp(3) without time zone")]
    public DateTime UpdatedAt { get; set; }

    [InverseProperty("Cocktail")]
    public virtual ICollection<CocktailIngredient> CocktailIngredients { get; set; } = new List<CocktailIngredient>();

    [ForeignKey("CreatedById")]
    [InverseProperty("Cocktails")]
    public virtual User? CreatedBy { get; set; } = null!;

    [InverseProperty("Cocktail")]
    public virtual ICollection<TabCocktail> TabCocktails { get; set; } = new List<TabCocktail>();


    [InverseProperty("Cocktail")]
    public virtual ICollection<UserCocktail> UserCocktails { get; set; } = new List<UserCocktail>();

    [InverseProperty("Cocktail")]
    public virtual ICollection<UserHistory> UserHistories { get; set; } = new List<UserHistory>();
}
