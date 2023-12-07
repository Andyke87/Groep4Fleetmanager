using System.ComponentModel.DataAnnotations;
public class AuthenticationDTO
{
    public int Id { get; set; }
    [Required]
    public string? Name { get; set; }
    [Required]
    public string? FirstName { get; set; }
    [Required]
    [EmailAddress]
    public string? Email { get; set; }
    [Required]
    [MinLength(6)]
    public string? Password { get; set; }

}