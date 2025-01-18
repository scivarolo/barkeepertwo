using Barkeeper.Models.Database;
using Microsoft.EntityFrameworkCore;

namespace Barkeeper.Data;

public partial class BarkeeperContext : DbContext {
    public BarkeeperContext() { }

    public BarkeeperContext(DbContextOptions<BarkeeperContext> options) : base(options) { }

    public virtual DbSet<Cocktail> Cocktails { get; set; }

    public virtual DbSet<CocktailIngredient> CocktailIngredients { get; set; }

    public virtual DbSet<Ingredient> Ingredients { get; set; }

    public virtual DbSet<IngredientType> IngredientTypes { get; set; }

    public virtual DbSet<Product> Products { get; set; }

    public virtual DbSet<ShoppingItem> ShoppingItems { get; set; }

    public virtual DbSet<TabCocktail> TabCocktails { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<UserCocktail> UserCocktails { get; set; }

    public virtual DbSet<UserHistory> UserHistories { get; set; }

    public virtual DbSet<UserIngredient> UserIngredients { get; set; }

    public virtual DbSet<UserProduct> UserProducts { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder) {
        modelBuilder.Entity<Cocktail>(entity => {
            entity.HasKey(e => e.Id).HasName("Cocktail_pkey");

            entity.Property(e => e.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");

            entity.HasOne(d => d.CreatedBy).WithMany(p => p.Cocktails)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("Cocktail_createdById_fkey");
        });

        modelBuilder.Entity<CocktailIngredient>(entity => {
            entity.HasKey(e => e.Id).HasName("CocktailIngredient_pkey");

            entity.HasOne(d => d.Cocktail).WithMany(p => p.CocktailIngredients)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("CocktailIngredient_cocktailId_fkey");

            entity.HasOne(d => d.Ingredient).WithMany(p => p.CocktailIngredients)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("CocktailIngredient_ingredientId_fkey");

            entity.HasOne(d => d.Product).WithMany(p => p.CocktailIngredients)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("CocktailIngredient_productId_fkey");
        });

        modelBuilder.Entity<Ingredient>(entity => {
            entity.HasKey(e => e.Id).HasName("Ingredient_pkey");

            entity.Property(e => e.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");

            entity.HasOne(d => d.CreatedBy).WithMany(p => p.Ingredients)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("Ingredient_createdById_fkey");

            entity.HasOne(d => d.IngredientType).WithMany(p => p.Ingredients)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("Ingredient_ingredientTypeId_fkey");
        });

        modelBuilder.Entity<IngredientType>(entity => {
            entity.HasKey(e => e.Id).HasName("IngredientType_pkey");

            entity.Property(e => e.IsLiquid).HasDefaultValue(true);
        });

        modelBuilder.Entity<Product>(entity => {
            entity.HasKey(e => e.Id).HasName("Product_pkey");

            entity.Property(e => e.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");

            entity.HasOne(d => d.CreatedBy).WithMany(p => p.Products)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("Product_createdById_fkey");

            entity.HasOne(d => d.Ingredient).WithMany(p => p.Products)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("Product_ingredientId_fkey");
        });

        modelBuilder.Entity<ShoppingItem>(entity => {
            entity.HasKey(e => e.Id).HasName("ShoppingItem_pkey");

            entity.Property(e => e.DateAdded).HasDefaultValueSql("CURRENT_TIMESTAMP");
            entity.Property(e => e.Quantity).HasDefaultValue(1);

            entity.HasOne(d => d.Ingredient).WithMany(p => p.ShoppingItems)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("ShoppingItem_ingredientId_fkey");

            entity.HasOne(d => d.Product).WithMany(p => p.ShoppingItems)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("ShoppingItem_productId_fkey");

            entity.HasOne(d => d.User).WithMany(p => p.ShoppingItems)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("ShoppingItem_userId_fkey");
        });

        modelBuilder.Entity<TabCocktail>(entity => {
            entity.HasKey(e => e.Id).HasName("TabCocktail_pkey");

            entity.HasOne(d => d.Cocktail).WithMany(p => p.TabCocktails)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("TabCocktail_cocktailId_fkey");

            entity.HasOne(d => d.User).WithMany(p => p.TabCocktails)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("TabCocktail_userId_fkey");
        });

        modelBuilder.Entity<User>(entity => {
            entity.HasKey(e => e.Id).HasName("User_pkey");

            entity.Property(e => e.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
        });

        modelBuilder.Entity<UserCocktail>(entity => {
            entity.HasKey(e => e.Id).HasName("UserCocktail_pkey");

            entity.Property(e => e.DateAdded).HasDefaultValueSql("CURRENT_TIMESTAMP");

            entity.HasOne(d => d.Cocktail).WithMany(p => p.UserCocktails)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("UserCocktail_cocktailId_fkey");

            entity.HasOne(d => d.User).WithMany(p => p.UserCocktails)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("UserCocktail_userId_fkey");
        });

        modelBuilder.Entity<UserHistory>(entity => {
            entity.HasKey(e => e.Id).HasName("UserHistory_pkey");

            entity.Property(e => e.DrinkDate).HasDefaultValueSql("CURRENT_TIMESTAMP");

            entity.HasOne(d => d.Cocktail).WithMany(p => p.UserHistories)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("UserHistory_cocktailId_fkey");

            entity.HasOne(d => d.User).WithMany(p => p.UserHistories)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("UserHistory_userId_fkey");
        });

        modelBuilder.Entity<UserIngredient>(entity => {
            entity.HasKey(e => e.Id).HasName("UserIngredient_pkey");

            entity.Property(e => e.DateAdded).HasDefaultValueSql("CURRENT_TIMESTAMP");

            entity.HasOne(d => d.Ingredient).WithMany(p => p.UserIngredients)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("UserIngredient_ingredientId_fkey");

            entity.HasOne(d => d.User).WithMany(p => p.UserIngredients)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("UserIngredient_userId_fkey");
        });

        modelBuilder.Entity<UserProduct>(entity => {
            entity.HasKey(e => e.Id).HasName("UserProduct_pkey");

            entity.Property(e => e.DateAdded).HasDefaultValueSql("CURRENT_TIMESTAMP");

            entity.HasOne(d => d.Product).WithMany(p => p.UserProducts)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("UserProduct_productId_fkey");

            entity.HasOne(d => d.User).WithMany(p => p.UserProducts)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("UserProduct_userId_fkey");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
