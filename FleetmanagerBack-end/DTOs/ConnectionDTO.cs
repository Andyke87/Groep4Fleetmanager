using System.ComponentModel.DataAnnotations;

public class ConnectionDTO
{
    [Key]
    public int Id { get; set; }

    [Required]
    public required int IdDriver { get; set; }

    [Required]
    public required int IdGasCard { get; set; }

    [Required]
    public required int IdVehicle { get; set; }
}