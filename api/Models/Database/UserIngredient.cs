using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Barkeeper.Models.Database;

[Table("UserIngredient")]
[Index("UserId", "IngredientId", Name = "UserIngredient_userId_ingredientId_key", IsUnique = true)]
public partial class UserIngredient
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("userId")]
    public string UserId { get; set; } = null!;

    [Column("ingredientId")]
    public int IngredientId { get; set; }

    [Column("dateAdded", TypeName = "timestamp(3) without time zone")]
    public DateTime DateAdded { get; set; }

    [ForeignKey("IngredientId")]
    [InverseProperty("UserIngredients")]
    public virtual Ingredient Ingredient { get; set; } = null!;

    [ForeignKey("UserId")]
    [InverseProperty("UserIngredients")]
    public virtual User User { get; set; } = null!;
}
