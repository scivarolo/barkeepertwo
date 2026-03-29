using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Barkeeper.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddProductSize : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "size",
                table: "Product",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "size",
                table: "Product");
        }
    }
}
