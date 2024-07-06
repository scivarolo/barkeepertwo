using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Barkeeper.Models.Database;

[Table("UserCocktail")]
[Index("UserId", "CocktailId", Name = "UserCocktail_userId_cocktailId_key", IsUnique = true)]
public partial class UserCocktail
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("userId")]
    public string UserId { get; set; } = null!;

    [Column("cocktailId")]
    public int CocktailId { get; set; }

    [Column("dateAdded", TypeName = "timestamp(3) without time zone")]
    public DateTime DateAdded { get; set; }

    [ForeignKey("CocktailId")]
    [InverseProperty("UserCocktails")]
    public virtual Cocktail Cocktail { get; set; } = null!;

    [ForeignKey("UserId")]
    [InverseProperty("UserCocktails")]
    public virtual User User { get; set; } = null!;
}
