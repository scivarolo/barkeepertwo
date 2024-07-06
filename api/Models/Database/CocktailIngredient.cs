﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Barkeeper.Models.Database;

[Table("CocktailIngredient")]
public partial class CocktailIngredient {
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("amount")]
    [Precision(65, 30)]
    public decimal Amount { get; set; }

    [Column("units")]
    public string? Units { get; set; }

    [Column("cocktailId")]
    public int CocktailId { get; set; }

    [Column("ingredientId")]
    public int IngredientId { get; set; }

    [Column("productId")]
    public int? ProductId { get; set; }

    [Column("order")]
    public int Order { get; set; }

    [ForeignKey("CocktailId")]
    [InverseProperty("CocktailIngredients")]
    public virtual Cocktail Cocktail { get; set; } = null!;

    [ForeignKey("IngredientId")]
    [InverseProperty("CocktailIngredients")]
    public virtual Ingredient Ingredient { get; set; } = null!;

    [ForeignKey("ProductId")]
    [InverseProperty("CocktailIngredients")]
    public virtual Product? Product { get; set; }
}
