﻿// <auto-generated />
using System;
using Barkeeper.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Barkeeper.Migrations
{
    [DbContext(typeof(BarkeeperContext))]
    partial class BarkeeperContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.6")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("Barkeeper.Models.Database.Cocktail", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreatedAt")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("timestamp(3) without time zone")
                        .HasColumnName("createdAt")
                        .HasDefaultValueSql("CURRENT_TIMESTAMP");

                    b.Property<string>("CreatedById")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("createdById");

                    b.Property<string>("Instructions")
                        .HasColumnType("text")
                        .HasColumnName("instructions");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("name");

                    b.Property<string>("Notes")
                        .HasColumnType("text")
                        .HasColumnName("notes");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("timestamp(3) without time zone")
                        .HasColumnName("updatedAt");

                    b.HasKey("Id")
                        .HasName("Cocktail_pkey");

                    b.HasIndex("CreatedById");

                    b.ToTable("Cocktail");
                });

            modelBuilder.Entity("Barkeeper.Models.Database.CocktailIngredient", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<decimal>("Amount")
                        .HasPrecision(65, 30)
                        .HasColumnType("numeric(65,30)")
                        .HasColumnName("amount");

                    b.Property<int>("CocktailId")
                        .HasColumnType("integer")
                        .HasColumnName("cocktailId");

                    b.Property<int>("IngredientId")
                        .HasColumnType("integer")
                        .HasColumnName("ingredientId");

                    b.Property<int>("Order")
                        .HasColumnType("integer")
                        .HasColumnName("order");

                    b.Property<int?>("ProductId")
                        .HasColumnType("integer")
                        .HasColumnName("productId");

                    b.Property<string>("Units")
                        .HasColumnType("text")
                        .HasColumnName("units");

                    b.HasKey("Id")
                        .HasName("CocktailIngredient_pkey");

                    b.HasIndex("CocktailId");

                    b.HasIndex("IngredientId");

                    b.HasIndex("ProductId");

                    b.ToTable("CocktailIngredient");
                });

            modelBuilder.Entity("Barkeeper.Models.Database.Ingredient", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreatedAt")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("timestamp(3) without time zone")
                        .HasColumnName("createdAt")
                        .HasDefaultValueSql("CURRENT_TIMESTAMP");

                    b.Property<string>("CreatedById")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("createdById");

                    b.Property<int?>("IngredientTypeId")
                        .HasColumnType("integer")
                        .HasColumnName("ingredientTypeId");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("name");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("timestamp(3) without time zone")
                        .HasColumnName("updatedAt");

                    b.HasKey("Id")
                        .HasName("Ingredient_pkey");

                    b.HasIndex("CreatedById");

                    b.HasIndex("IngredientTypeId");

                    b.HasIndex(new[] { "Name" }, "Ingredient_name_key")
                        .IsUnique();

                    b.ToTable("Ingredient");
                });

            modelBuilder.Entity("Barkeeper.Models.Database.IngredientType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<bool>("IsLiquid")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("boolean")
                        .HasDefaultValue(true)
                        .HasColumnName("isLiquid");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("name");

                    b.HasKey("Id")
                        .HasName("IngredientType_pkey");

                    b.HasIndex(new[] { "Name" }, "IngredientType_name_key")
                        .IsUnique();

                    b.ToTable("IngredientType");
                });

            modelBuilder.Entity("Barkeeper.Models.Database.Product", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreatedAt")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("timestamp(3) without time zone")
                        .HasColumnName("createdAt")
                        .HasDefaultValueSql("CURRENT_TIMESTAMP");

                    b.Property<string>("CreatedById")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("createdById");

                    b.Property<int>("IngredientId")
                        .HasColumnType("integer")
                        .HasColumnName("ingredientId");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("name");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("timestamp(3) without time zone")
                        .HasColumnName("updatedAt");

                    b.HasKey("Id")
                        .HasName("Product_pkey");

                    b.HasIndex("CreatedById");

                    b.HasIndex("IngredientId");

                    b.ToTable("Product");
                });

            modelBuilder.Entity("Barkeeper.Models.Database.ShoppingItem", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("DateAdded")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("timestamp(3) without time zone")
                        .HasColumnName("dateAdded")
                        .HasDefaultValueSql("CURRENT_TIMESTAMP");

                    b.Property<int?>("IngredientId")
                        .HasColumnType("integer")
                        .HasColumnName("ingredientId");

                    b.Property<int?>("ProductId")
                        .HasColumnType("integer")
                        .HasColumnName("productId");

                    b.Property<int>("Quantity")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasDefaultValue(1)
                        .HasColumnName("quantity");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("userId");

                    b.HasKey("Id")
                        .HasName("ShoppingItem_pkey");

                    b.HasIndex("IngredientId");

                    b.HasIndex("ProductId");

                    b.HasIndex("UserId");

                    b.ToTable("ShoppingItem");
                });

            modelBuilder.Entity("Barkeeper.Models.Database.TabCocktail", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("CocktailId")
                        .HasColumnType("integer")
                        .HasColumnName("cocktailId");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("userId");

                    b.HasKey("Id")
                        .HasName("TabCocktail_pkey");

                    b.HasIndex("CocktailId");

                    b.HasIndex("UserId");

                    b.ToTable("TabCocktail");
                });

            modelBuilder.Entity("Barkeeper.Models.Database.User", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("text")
                        .HasColumnName("id");

                    b.Property<DateTime>("CreatedAt")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("timestamp(3) without time zone")
                        .HasColumnName("createdAt")
                        .HasDefaultValueSql("CURRENT_TIMESTAMP");

                    b.Property<string>("DisplayName")
                        .HasColumnType("text")
                        .HasColumnName("displayName");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("timestamp(3) without time zone")
                        .HasColumnName("updatedAt");

                    b.HasKey("Id")
                        .HasName("User_pkey");

                    b.HasIndex(new[] { "DisplayName" }, "User_displayName_key")
                        .IsUnique();

                    b.ToTable("User");
                });

            modelBuilder.Entity("Barkeeper.Models.Database.UserCocktail", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("CocktailId")
                        .HasColumnType("integer")
                        .HasColumnName("cocktailId");

                    b.Property<DateTime>("DateAdded")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("timestamp(3) without time zone")
                        .HasColumnName("dateAdded")
                        .HasDefaultValueSql("CURRENT_TIMESTAMP");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("userId");

                    b.HasKey("Id")
                        .HasName("UserCocktail_pkey");

                    b.HasIndex("CocktailId");

                    b.HasIndex(new[] { "UserId", "CocktailId" }, "UserCocktail_userId_cocktailId_key")
                        .IsUnique();

                    b.ToTable("UserCocktail");
                });

            modelBuilder.Entity("Barkeeper.Models.Database.UserHistory", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("CocktailId")
                        .HasColumnType("integer")
                        .HasColumnName("cocktailId");

                    b.Property<DateTime>("DrinkDate")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("timestamp(3) without time zone")
                        .HasColumnName("drinkDate")
                        .HasDefaultValueSql("CURRENT_TIMESTAMP");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("userId");

                    b.HasKey("Id")
                        .HasName("UserHistory_pkey");

                    b.HasIndex("CocktailId");

                    b.HasIndex("UserId");

                    b.ToTable("UserHistory");
                });

            modelBuilder.Entity("Barkeeper.Models.Database.UserIngredient", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("DateAdded")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("timestamp(3) without time zone")
                        .HasColumnName("dateAdded")
                        .HasDefaultValueSql("CURRENT_TIMESTAMP");

                    b.Property<int>("IngredientId")
                        .HasColumnType("integer")
                        .HasColumnName("ingredientId");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("userId");

                    b.HasKey("Id")
                        .HasName("UserIngredient_pkey");

                    b.HasIndex("IngredientId");

                    b.HasIndex(new[] { "UserId", "IngredientId" }, "UserIngredient_userId_ingredientId_key")
                        .IsUnique();

                    b.ToTable("UserIngredient");
                });

            modelBuilder.Entity("Barkeeper.Models.Database.UserProduct", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("DateAdded")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("timestamp(3) without time zone")
                        .HasColumnName("dateAdded")
                        .HasDefaultValueSql("CURRENT_TIMESTAMP");

                    b.Property<int>("ProductId")
                        .HasColumnType("integer")
                        .HasColumnName("productId");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("userId");

                    b.HasKey("Id")
                        .HasName("UserProduct_pkey");

                    b.HasIndex("ProductId");

                    b.HasIndex("UserId");

                    b.ToTable("UserProduct");
                });

            modelBuilder.Entity("Barkeeper.Models.Database.Cocktail", b =>
                {
                    b.HasOne("Barkeeper.Models.Database.User", "CreatedBy")
                        .WithMany("Cocktails")
                        .HasForeignKey("CreatedById")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired()
                        .HasConstraintName("Cocktail_createdById_fkey");

                    b.Navigation("CreatedBy");
                });

            modelBuilder.Entity("Barkeeper.Models.Database.CocktailIngredient", b =>
                {
                    b.HasOne("Barkeeper.Models.Database.Cocktail", "Cocktail")
                        .WithMany("CocktailIngredients")
                        .HasForeignKey("CocktailId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired()
                        .HasConstraintName("CocktailIngredient_cocktailId_fkey");

                    b.HasOne("Barkeeper.Models.Database.Ingredient", "Ingredient")
                        .WithMany("CocktailIngredients")
                        .HasForeignKey("IngredientId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired()
                        .HasConstraintName("CocktailIngredient_ingredientId_fkey");

                    b.HasOne("Barkeeper.Models.Database.Product", "Product")
                        .WithMany("CocktailIngredients")
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.SetNull)
                        .HasConstraintName("CocktailIngredient_productId_fkey");

                    b.Navigation("Cocktail");

                    b.Navigation("Ingredient");

                    b.Navigation("Product");
                });

            modelBuilder.Entity("Barkeeper.Models.Database.Ingredient", b =>
                {
                    b.HasOne("Barkeeper.Models.Database.User", "CreatedBy")
                        .WithMany("Ingredients")
                        .HasForeignKey("CreatedById")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired()
                        .HasConstraintName("Ingredient_createdById_fkey");

                    b.HasOne("Barkeeper.Models.Database.IngredientType", "IngredientType")
                        .WithMany("Ingredients")
                        .HasForeignKey("IngredientTypeId")
                        .OnDelete(DeleteBehavior.SetNull)
                        .HasConstraintName("Ingredient_ingredientTypeId_fkey");

                    b.Navigation("CreatedBy");

                    b.Navigation("IngredientType");
                });

            modelBuilder.Entity("Barkeeper.Models.Database.Product", b =>
                {
                    b.HasOne("Barkeeper.Models.Database.User", "CreatedBy")
                        .WithMany("Products")
                        .HasForeignKey("CreatedById")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired()
                        .HasConstraintName("Product_createdById_fkey");

                    b.HasOne("Barkeeper.Models.Database.Ingredient", "Ingredient")
                        .WithMany("Products")
                        .HasForeignKey("IngredientId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired()
                        .HasConstraintName("Product_ingredientId_fkey");

                    b.Navigation("CreatedBy");

                    b.Navigation("Ingredient");
                });

            modelBuilder.Entity("Barkeeper.Models.Database.ShoppingItem", b =>
                {
                    b.HasOne("Barkeeper.Models.Database.Ingredient", "Ingredient")
                        .WithMany("ShoppingItems")
                        .HasForeignKey("IngredientId")
                        .OnDelete(DeleteBehavior.SetNull)
                        .HasConstraintName("ShoppingItem_ingredientId_fkey");

                    b.HasOne("Barkeeper.Models.Database.Product", "Product")
                        .WithMany("ShoppingItems")
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.SetNull)
                        .HasConstraintName("ShoppingItem_productId_fkey");

                    b.HasOne("Barkeeper.Models.Database.User", "User")
                        .WithMany("ShoppingItems")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired()
                        .HasConstraintName("ShoppingItem_userId_fkey");

                    b.Navigation("Ingredient");

                    b.Navigation("Product");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Barkeeper.Models.Database.TabCocktail", b =>
                {
                    b.HasOne("Barkeeper.Models.Database.Cocktail", "Cocktail")
                        .WithMany("TabCocktails")
                        .HasForeignKey("CocktailId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired()
                        .HasConstraintName("TabCocktail_cocktailId_fkey");

                    b.HasOne("Barkeeper.Models.Database.User", "User")
                        .WithMany("TabCocktails")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired()
                        .HasConstraintName("TabCocktail_userId_fkey");

                    b.Navigation("Cocktail");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Barkeeper.Models.Database.UserCocktail", b =>
                {
                    b.HasOne("Barkeeper.Models.Database.Cocktail", "Cocktail")
                        .WithMany("UserCocktails")
                        .HasForeignKey("CocktailId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired()
                        .HasConstraintName("UserCocktail_cocktailId_fkey");

                    b.HasOne("Barkeeper.Models.Database.User", "User")
                        .WithMany("UserCocktails")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired()
                        .HasConstraintName("UserCocktail_userId_fkey");

                    b.Navigation("Cocktail");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Barkeeper.Models.Database.UserHistory", b =>
                {
                    b.HasOne("Barkeeper.Models.Database.Cocktail", "Cocktail")
                        .WithMany("UserHistories")
                        .HasForeignKey("CocktailId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired()
                        .HasConstraintName("UserHistory_cocktailId_fkey");

                    b.HasOne("Barkeeper.Models.Database.User", "User")
                        .WithMany("UserHistories")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired()
                        .HasConstraintName("UserHistory_userId_fkey");

                    b.Navigation("Cocktail");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Barkeeper.Models.Database.UserIngredient", b =>
                {
                    b.HasOne("Barkeeper.Models.Database.Ingredient", "Ingredient")
                        .WithMany("UserIngredients")
                        .HasForeignKey("IngredientId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired()
                        .HasConstraintName("UserIngredient_ingredientId_fkey");

                    b.HasOne("Barkeeper.Models.Database.User", "User")
                        .WithMany("UserIngredients")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired()
                        .HasConstraintName("UserIngredient_userId_fkey");

                    b.Navigation("Ingredient");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Barkeeper.Models.Database.UserProduct", b =>
                {
                    b.HasOne("Barkeeper.Models.Database.Product", "Product")
                        .WithMany("UserProducts")
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired()
                        .HasConstraintName("UserProduct_productId_fkey");

                    b.HasOne("Barkeeper.Models.Database.User", "User")
                        .WithMany("UserProducts")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired()
                        .HasConstraintName("UserProduct_userId_fkey");

                    b.Navigation("Product");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Barkeeper.Models.Database.Cocktail", b =>
                {
                    b.Navigation("CocktailIngredients");

                    b.Navigation("TabCocktails");

                    b.Navigation("UserCocktails");

                    b.Navigation("UserHistories");
                });

            modelBuilder.Entity("Barkeeper.Models.Database.Ingredient", b =>
                {
                    b.Navigation("CocktailIngredients");

                    b.Navigation("Products");

                    b.Navigation("ShoppingItems");

                    b.Navigation("UserIngredients");
                });

            modelBuilder.Entity("Barkeeper.Models.Database.IngredientType", b =>
                {
                    b.Navigation("Ingredients");
                });

            modelBuilder.Entity("Barkeeper.Models.Database.Product", b =>
                {
                    b.Navigation("CocktailIngredients");

                    b.Navigation("ShoppingItems");

                    b.Navigation("UserProducts");
                });

            modelBuilder.Entity("Barkeeper.Models.Database.User", b =>
                {
                    b.Navigation("Cocktails");

                    b.Navigation("Ingredients");

                    b.Navigation("Products");

                    b.Navigation("ShoppingItems");

                    b.Navigation("TabCocktails");

                    b.Navigation("UserCocktails");

                    b.Navigation("UserHistories");

                    b.Navigation("UserIngredients");

                    b.Navigation("UserProducts");
                });
#pragma warning restore 612, 618
        }
    }
}
