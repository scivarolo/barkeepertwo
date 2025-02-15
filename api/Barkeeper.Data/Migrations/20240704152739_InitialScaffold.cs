using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Barkeeper.Data.Migrations {
    /// <inheritdoc />
    public partial class InitialScaffold : Migration {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder) {
            migrationBuilder.CreateTable(
                name: "IngredientType",
                columns: table => new {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "text", nullable: false),
                    isLiquid = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true)
                },
                constraints: table => {
                    table.PrimaryKey("IngredientType_pkey", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new {
                    id = table.Column<string>(type: "text", nullable: false),
                    createdAt = table.Column<DateTime>(type: "timestamp(3) without time zone", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    updatedAt = table.Column<DateTime>(type: "timestamp(3) without time zone", nullable: false),
                    displayName = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table => {
                    table.PrimaryKey("User_pkey", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Cocktail",
                columns: table => new {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "text", nullable: false),
                    instructions = table.Column<string>(type: "text", nullable: true),
                    notes = table.Column<string>(type: "text", nullable: true),
                    createdById = table.Column<string>(type: "text", nullable: false),
                    createdAt = table.Column<DateTime>(type: "timestamp(3) without time zone", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    updatedAt = table.Column<DateTime>(type: "timestamp(3) without time zone", nullable: false)
                },
                constraints: table => {
                    table.PrimaryKey("Cocktail_pkey", x => x.id);
                    table.ForeignKey(
                        name: "Cocktail_createdById_fkey",
                        column: x => x.createdById,
                        principalTable: "User",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Ingredient",
                columns: table => new {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "text", nullable: false),
                    createdById = table.Column<string>(type: "text", nullable: false),
                    createdAt = table.Column<DateTime>(type: "timestamp(3) without time zone", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    updatedAt = table.Column<DateTime>(type: "timestamp(3) without time zone", nullable: false),
                    ingredientTypeId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table => {
                    table.PrimaryKey("Ingredient_pkey", x => x.id);
                    table.ForeignKey(
                        name: "Ingredient_createdById_fkey",
                        column: x => x.createdById,
                        principalTable: "User",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "Ingredient_ingredientTypeId_fkey",
                        column: x => x.ingredientTypeId,
                        principalTable: "IngredientType",
                        principalColumn: "id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "TabCocktail",
                columns: table => new {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    cocktailId = table.Column<int>(type: "integer", nullable: false),
                    userId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table => {
                    table.PrimaryKey("TabCocktail_pkey", x => x.id);
                    table.ForeignKey(
                        name: "TabCocktail_cocktailId_fkey",
                        column: x => x.cocktailId,
                        principalTable: "Cocktail",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "TabCocktail_userId_fkey",
                        column: x => x.userId,
                        principalTable: "User",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UserCocktail",
                columns: table => new {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    userId = table.Column<string>(type: "text", nullable: false),
                    cocktailId = table.Column<int>(type: "integer", nullable: false),
                    dateAdded = table.Column<DateTime>(type: "timestamp(3) without time zone", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP")
                },
                constraints: table => {
                    table.PrimaryKey("UserCocktail_pkey", x => x.id);
                    table.ForeignKey(
                        name: "UserCocktail_cocktailId_fkey",
                        column: x => x.cocktailId,
                        principalTable: "Cocktail",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "UserCocktail_userId_fkey",
                        column: x => x.userId,
                        principalTable: "User",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UserHistory",
                columns: table => new {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    drinkDate = table.Column<DateTime>(type: "timestamp(3) without time zone", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    userId = table.Column<string>(type: "text", nullable: false),
                    cocktailId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table => {
                    table.PrimaryKey("UserHistory_pkey", x => x.id);
                    table.ForeignKey(
                        name: "UserHistory_cocktailId_fkey",
                        column: x => x.cocktailId,
                        principalTable: "Cocktail",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "UserHistory_userId_fkey",
                        column: x => x.userId,
                        principalTable: "User",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Product",
                columns: table => new {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "text", nullable: false),
                    ingredientId = table.Column<int>(type: "integer", nullable: false),
                    createdById = table.Column<string>(type: "text", nullable: false),
                    createdAt = table.Column<DateTime>(type: "timestamp(3) without time zone", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    updatedAt = table.Column<DateTime>(type: "timestamp(3) without time zone", nullable: false)
                },
                constraints: table => {
                    table.PrimaryKey("Product_pkey", x => x.id);
                    table.ForeignKey(
                        name: "Product_createdById_fkey",
                        column: x => x.createdById,
                        principalTable: "User",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "Product_ingredientId_fkey",
                        column: x => x.ingredientId,
                        principalTable: "Ingredient",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UserIngredient",
                columns: table => new {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    userId = table.Column<string>(type: "text", nullable: false),
                    ingredientId = table.Column<int>(type: "integer", nullable: false),
                    dateAdded = table.Column<DateTime>(type: "timestamp(3) without time zone", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP")
                },
                constraints: table => {
                    table.PrimaryKey("UserIngredient_pkey", x => x.id);
                    table.ForeignKey(
                        name: "UserIngredient_ingredientId_fkey",
                        column: x => x.ingredientId,
                        principalTable: "Ingredient",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "UserIngredient_userId_fkey",
                        column: x => x.userId,
                        principalTable: "User",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "CocktailIngredient",
                columns: table => new {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    amount = table.Column<decimal>(type: "numeric(65,30)", precision: 65, scale: 30, nullable: false),
                    units = table.Column<string>(type: "text", nullable: true),
                    cocktailId = table.Column<int>(type: "integer", nullable: false),
                    ingredientId = table.Column<int>(type: "integer", nullable: false),
                    productId = table.Column<int>(type: "integer", nullable: true),
                    order = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table => {
                    table.PrimaryKey("CocktailIngredient_pkey", x => x.id);
                    table.ForeignKey(
                        name: "CocktailIngredient_cocktailId_fkey",
                        column: x => x.cocktailId,
                        principalTable: "Cocktail",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "CocktailIngredient_ingredientId_fkey",
                        column: x => x.ingredientId,
                        principalTable: "Ingredient",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "CocktailIngredient_productId_fkey",
                        column: x => x.productId,
                        principalTable: "Product",
                        principalColumn: "id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "ShoppingItem",
                columns: table => new {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    quantity = table.Column<int>(type: "integer", nullable: false, defaultValue: 1),
                    ingredientId = table.Column<int>(type: "integer", nullable: true),
                    productId = table.Column<int>(type: "integer", nullable: true),
                    userId = table.Column<string>(type: "text", nullable: false),
                    dateAdded = table.Column<DateTime>(type: "timestamp(3) without time zone", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP")
                },
                constraints: table => {
                    table.PrimaryKey("ShoppingItem_pkey", x => x.id);
                    table.ForeignKey(
                        name: "ShoppingItem_ingredientId_fkey",
                        column: x => x.ingredientId,
                        principalTable: "Ingredient",
                        principalColumn: "id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "ShoppingItem_productId_fkey",
                        column: x => x.productId,
                        principalTable: "Product",
                        principalColumn: "id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "ShoppingItem_userId_fkey",
                        column: x => x.userId,
                        principalTable: "User",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UserProduct",
                columns: table => new {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    userId = table.Column<string>(type: "text", nullable: false),
                    productId = table.Column<int>(type: "integer", nullable: false),
                    dateAdded = table.Column<DateTime>(type: "timestamp(3) without time zone", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP")
                },
                constraints: table => {
                    table.PrimaryKey("UserProduct_pkey", x => x.id);
                    table.ForeignKey(
                        name: "UserProduct_productId_fkey",
                        column: x => x.productId,
                        principalTable: "Product",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "UserProduct_userId_fkey",
                        column: x => x.userId,
                        principalTable: "User",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Cocktail_createdById",
                table: "Cocktail",
                column: "createdById");

            migrationBuilder.CreateIndex(
                name: "IX_CocktailIngredient_cocktailId",
                table: "CocktailIngredient",
                column: "cocktailId");

            migrationBuilder.CreateIndex(
                name: "IX_CocktailIngredient_ingredientId",
                table: "CocktailIngredient",
                column: "ingredientId");

            migrationBuilder.CreateIndex(
                name: "IX_CocktailIngredient_productId",
                table: "CocktailIngredient",
                column: "productId");

            migrationBuilder.CreateIndex(
                name: "Ingredient_name_key",
                table: "Ingredient",
                column: "name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Ingredient_createdById",
                table: "Ingredient",
                column: "createdById");

            migrationBuilder.CreateIndex(
                name: "IX_Ingredient_ingredientTypeId",
                table: "Ingredient",
                column: "ingredientTypeId");

            migrationBuilder.CreateIndex(
                name: "IngredientType_name_key",
                table: "IngredientType",
                column: "name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Product_createdById",
                table: "Product",
                column: "createdById");

            migrationBuilder.CreateIndex(
                name: "IX_Product_ingredientId",
                table: "Product",
                column: "ingredientId");

            migrationBuilder.CreateIndex(
                name: "IX_ShoppingItem_ingredientId",
                table: "ShoppingItem",
                column: "ingredientId");

            migrationBuilder.CreateIndex(
                name: "IX_ShoppingItem_productId",
                table: "ShoppingItem",
                column: "productId");

            migrationBuilder.CreateIndex(
                name: "IX_ShoppingItem_userId",
                table: "ShoppingItem",
                column: "userId");

            migrationBuilder.CreateIndex(
                name: "IX_TabCocktail_cocktailId",
                table: "TabCocktail",
                column: "cocktailId");

            migrationBuilder.CreateIndex(
                name: "IX_TabCocktail_userId",
                table: "TabCocktail",
                column: "userId");

            migrationBuilder.CreateIndex(
                name: "User_displayName_key",
                table: "User",
                column: "displayName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserCocktail_cocktailId",
                table: "UserCocktail",
                column: "cocktailId");

            migrationBuilder.CreateIndex(
                name: "UserCocktail_userId_cocktailId_key",
                table: "UserCocktail",
                columns: new[] { "userId", "cocktailId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserHistory_cocktailId",
                table: "UserHistory",
                column: "cocktailId");

            migrationBuilder.CreateIndex(
                name: "IX_UserHistory_userId",
                table: "UserHistory",
                column: "userId");

            migrationBuilder.CreateIndex(
                name: "IX_UserIngredient_ingredientId",
                table: "UserIngredient",
                column: "ingredientId");

            migrationBuilder.CreateIndex(
                name: "UserIngredient_userId_ingredientId_key",
                table: "UserIngredient",
                columns: new[] { "userId", "ingredientId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserProduct_productId",
                table: "UserProduct",
                column: "productId");

            migrationBuilder.CreateIndex(
                name: "IX_UserProduct_userId",
                table: "UserProduct",
                column: "userId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder) {
            migrationBuilder.DropTable(
                name: "CocktailIngredient");

            migrationBuilder.DropTable(
                name: "ShoppingItem");

            migrationBuilder.DropTable(
                name: "TabCocktail");

            migrationBuilder.DropTable(
                name: "UserCocktail");

            migrationBuilder.DropTable(
                name: "UserHistory");

            migrationBuilder.DropTable(
                name: "UserIngredient");

            migrationBuilder.DropTable(
                name: "UserProduct");

            migrationBuilder.DropTable(
                name: "Cocktail");

            migrationBuilder.DropTable(
                name: "Product");

            migrationBuilder.DropTable(
                name: "Ingredient");

            migrationBuilder.DropTable(
                name: "User");

            migrationBuilder.DropTable(
                name: "IngredientType");
        }
    }
}
