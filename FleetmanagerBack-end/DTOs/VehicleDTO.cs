using System.ComponentModel.DataAnnotations;

public class VehicleDTO
{
    [Key]
    public int IdVehicle { get; set; }

    [Required]
    public required string Brand { get; set; }

    [Required]
    public required string Model { get; set; }

    [Required]
    public required string ChassisNumber { get; set; }
    
    public string? LicensePlate { get; set; }

    [Required]
    public required string Fuel { get; set; }

    [Required]
    public required string VehicleType { get; set; }

    [Required]
    public required string Color { get; set; }

    [Required]
    public int NumberOfDoors { get; set; }
}