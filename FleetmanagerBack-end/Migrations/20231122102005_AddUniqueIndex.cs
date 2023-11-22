using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Back_end.Migrations
{
    /// <inheritdoc />
    public partial class AddUniqueIndex : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Driver",
                columns: table => new
                {
                    IdDriver = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    Insert = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    FirstName = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    Street = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    Number = table.Column<string>(type: "varchar(10)", unicode: false, maxLength: 10, nullable: true),
                    City = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    ZipCode = table.Column<int>(type: "int", unicode: false, maxLength: 10, nullable: true),
                    DayOfBirth = table.Column<DateTime>(type: "date", nullable: true),
                    RegistryNumber = table.Column<string>(type: "varchar(12)", unicode: false, maxLength: 12, nullable: true),
                    CategoryLicense = table.Column<string>(type: "varchar(10)", unicode: false, maxLength: 10, nullable: true),
                    Login = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: true),
                    Password = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Driver", x => x.IdDriver);
                });

            migrationBuilder.CreateTable(
                name: "GasCard",
                columns: table => new
                {
                    IdGasCard = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CardNumber = table.Column<string>(type: "varchar(12)", unicode: false, maxLength: 12, nullable: false),
                    ValidationDate = table.Column<DateTime>(type: "date", nullable: false),
                    Pin = table.Column<string>(type: "varchar(6)", unicode: false, maxLength: 6, nullable: true),
                    Fuel = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    Blocked = table.Column<bool>(type: "bit", nullable: false, defaultValueSql: "((0))")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GasCard", x => x.IdGasCard);
                });

            migrationBuilder.CreateTable(
                name: "Vehicle",
                columns: table => new
                {
                    IdVehicle = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Brand = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    Model = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    ChassisNumber = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    LicensePlate = table.Column<string>(type: "varchar(10)", unicode: false, maxLength: 10, nullable: true),
                    Fuel = table.Column<string>(type: "varchar(25)", unicode: false, maxLength: 25, nullable: true),
                    VehicleType = table.Column<string>(type: "varchar(25)", unicode: false, maxLength: 25, nullable: true),
                    Color = table.Column<string>(type: "varchar(25)", unicode: false, maxLength: 25, nullable: true),
                    NumberOfDoors = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vehicle", x => x.IdVehicle);
                });

            migrationBuilder.CreateTable(
                name: "Connection",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdDriver = table.Column<int>(type: "int", nullable: false),
                    IdGasCard = table.Column<int>(type: "int", nullable: false),
                    IdVehicle = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Connection", x => x.Id);
                    table.ForeignKey(
                        name: "FK__Connectie__IdBes__1A9EF37A",
                        column: x => x.IdDriver,
                        principalTable: "Driver",
                        principalColumn: "IdDriver");
                    table.ForeignKey(
                        name: "FK__Connectie__IdTan__1B9317B3",
                        column: x => x.IdGasCard,
                        principalTable: "GasCard",
                        principalColumn: "IdGasCard");
                    table.ForeignKey(
                        name: "FK__Connectie__IdVoe__1C873BEC",
                        column: x => x.IdVehicle,
                        principalTable: "Vehicle",
                        principalColumn: "IdVehicle");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Connection_IdDriver_IdGasCard_IdVehicle",
                table: "Connection",
                columns: new[] { "IdDriver", "IdGasCard", "IdVehicle" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Connection_IdGasCard",
                table: "Connection",
                column: "IdGasCard");

            migrationBuilder.CreateIndex(
                name: "IX_Connection_IdVehicle",
                table: "Connection",
                column: "IdVehicle");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Connection");

            migrationBuilder.DropTable(
                name: "Driver");

            migrationBuilder.DropTable(
                name: "GasCard");

            migrationBuilder.DropTable(
                name: "Vehicle");
        }
    }
}
