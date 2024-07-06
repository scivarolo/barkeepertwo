using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Barkeeper.Models.Database;

[Table("ShoppingItem")]
public partial class ShoppingItem
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("quantity")]
    public int Quantity { get; set; }

    [Column("ingredientId")]
    public int? IngredientId { get; set; }

    [Column("productId")]
    public int? ProductId { get; set; }

    [Column("userId")]
    public string UserId { get; set; } = null!;

    [Column("dateAdded", TypeName = "timestamp(3) without time zone")]
    public DateTime DateAdded { get; set; }

    [ForeignKey("IngredientId")]
    [InverseProperty("ShoppingItems")]
    public virtual Ingredient? Ingredient { get; set; }

    [ForeignKey("ProductId")]
    [InverseProperty("ShoppingItems")]
    public virtual Product? Product { get; set; }

    [ForeignKey("UserId")]
    [InverseProperty("ShoppingItems")]
    public virtual User User { get; set; } = null!;
}
