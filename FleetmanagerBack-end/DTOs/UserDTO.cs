using System.ComponentModel.DataAnnotations;
public class UserDto
{
    [Key]
    public int Id { get; set; }

    public string? Name { get; set; }

    public string? FirstName { get; set; }

    [Required]
    [EmailAddress]
    public required string Email { get; set; }

    [Required]
    [MinLength(6)]
    public required string Password { get; set; }
    
    public string? Role { get; set; }

}