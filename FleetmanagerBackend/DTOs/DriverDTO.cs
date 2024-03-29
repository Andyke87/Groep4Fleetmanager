using System.ComponentModel.DataAnnotations;

public class DriverDTO
{
    [Key]
    public int IdDriver { get; set; }

    [Required]
    public required string Name { get; set; }

    [Required]
    public required string FirstName { get; set; }

    public string? Street { get; set; }

    public string? Number { get; set; }

    public string? City { get; set; }

    public int? ZipCode { get; set; }

    [Required]
    [DataType(DataType.Date)]
    public DateTime DayOfBirth { get; set; }

    [Required]
    [MinLength(11), MaxLength(11)]
    public required string RegistryNumber { get; set; }

    [Required]
    [MaxLength(5)]
    public required string CategoryLicense { get; set; }
}