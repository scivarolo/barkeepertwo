using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Barkeeper.Models.Database;

[Table("IngredientType")]
[Index("Name", Name = "IngredientType_name_key", IsUnique = true)]
public partial class IngredientType {
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("name")]
    public string Name { get; set; } = null!;

    [Column("isLiquid")]
    public bool IsLiquid { get; set; }

    [InverseProperty("IngredientType")]
    public virtual ICollection<Ingredient> Ingredients { get; set; } = new List<Ingredient>();
}
