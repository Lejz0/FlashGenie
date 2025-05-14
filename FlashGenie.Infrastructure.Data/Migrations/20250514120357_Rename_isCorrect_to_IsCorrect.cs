using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FlashGenie.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class Rename_isCorrect_to_IsCorrect : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "isCorrect",
                table: "Answers",
                newName: "IsCorrect");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsCorrect",
                table: "Answers",
                newName: "isCorrect");
        }
    }
}
