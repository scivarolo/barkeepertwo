using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Barkeeper.Migrations {
    /// <inheritdoc />
    public partial class UpdateCocktailIngredientAmountPrecision : Migration {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder) {
            migrationBuilder.AlterColumn<decimal>(
                name: "amount",
                table: "CocktailIngredient",
                type: "numeric(10,3)",
                precision: 10,
                scale: 3,
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "numeric(65,30)",
                oldPrecision: 65,
                oldScale: 30);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder) {
            migrationBuilder.AlterColumn<decimal>(
                name: "amount",
                table: "CocktailIngredient",
                type: "numeric(65,30)",
                precision: 65,
                scale: 30,
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "numeric(10,3)",
                oldPrecision: 10,
                oldScale: 3);
        }
    }
}
