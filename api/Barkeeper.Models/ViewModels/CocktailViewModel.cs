using Barkeeper.Models.Database;

namespace Barkeeper.Models.ViewModels;

public class CocktailViewModel {

    public CocktailViewModel() { }

    public CocktailViewModel(Cocktail Cocktail) {
        Id = Cocktail.Id;
        Name = Cocktail.Name;
        Instructions = Cocktail.Instructions;
        Notes = Cocktail.Notes;
        CreatedById = Cocktail.CreatedById;
        CreatedByName = Cocktail.CreatedBy?.DisplayName;
        CreatedAt = Cocktail.CreatedAt;
        UpdatedAt = Cocktail.UpdatedAt;
        CocktailIngredients = Cocktail.CocktailIngredients;
    }

    public CocktailViewModel(Cocktail Cocktail, int CountLast30Days) : this(Cocktail) {
        this.CountLast30Days = CountLast30Days;
    }

    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string? Instructions { get; set; }

    public string? Notes { get; set; }

    public string CreatedById { get; set; } = null!;

    public string? CreatedByName { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    public virtual ICollection<CocktailIngredient> CocktailIngredients { get; set; } = new List<CocktailIngredient>();

    public int? CountLast30Days { get; set; }

}
