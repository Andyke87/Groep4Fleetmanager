using System.ComponentModel.DataAnnotations;

namespace FleetManager.Models;

public partial class Authentication
{
    [Key]
    public int Id { get; set; }
    [Required]
    public string Name { get; set; }
    [Required]
    public string FirstName { get; set; }
    [Required]
    [EmailAddress]
    public string Email { get; set; }
    [Required]
    [MinLength(6)]
    public string Password { get; set; }
    [Required]
    public string Role { get; set; }

    public Authentication(string name, string firstName, string email, string password, string role)
    {
        Name = name;
        FirstName = firstName;
        Email = email;
        Password = password;
        Role = role;
    }
}