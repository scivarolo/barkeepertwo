using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Barkeeper.Models.Database;

[Table("UserHistory")]
public partial class UserHistory
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("drinkDate", TypeName = "timestamp(3) without time zone")]
    public DateTime DrinkDate { get; set; }

    [Column("userId")]
    public string UserId { get; set; } = null!;

    [Column("cocktailId")]
    public int CocktailId { get; set; }

    [ForeignKey("CocktailId")]
    [InverseProperty("UserHistories")]
    public virtual Cocktail Cocktail { get; set; } = null!;

    [ForeignKey("UserId")]
    [InverseProperty("UserHistories")]
    public virtual User User { get; set; } = null!;
}
