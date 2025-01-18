using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Barkeeper.Models.Database;

[Table("TabCocktail")]
public partial class TabCocktail {
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("cocktailId")]
    public int CocktailId { get; set; }

    [Column("userId")]
    public string UserId { get; set; } = null!;

    [ForeignKey("CocktailId")]
    [InverseProperty("TabCocktails")]
    public virtual Cocktail Cocktail { get; set; } = null!;

    [ForeignKey("UserId")]
    [InverseProperty("TabCocktails")]
    public virtual User User { get; set; } = null!;
}
