using System.ComponentModel.DataAnnotations;

public class GasCardDTO
{
    [Key]
    public int IdGasCard { get; set; }
    
    [Required]
    [MinLength(8), MaxLength(12)]
    public required string CardNumber { get; set; }

    [Required]
    [DataType(DataType.Date)]
    public DateTime ValidationDate { get; set; }
    
    [Required]
    [MinLength(4), MaxLength(6)]
    public required string Pin { get; set; }

    [Required]
    public required string Fuel { get; set; }

    [Required]
    public required string BlockedCard { get; set; }
}