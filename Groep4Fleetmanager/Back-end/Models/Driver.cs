using System.ComponentModel.DataAnnotations;

namespace FleetManager.Models;

public partial class Driver
{
    [Key]
    public int IdDriver { get; set; }

    public string? Name { get; set; }
    public string? Insert { get; set; }

    public string? FirstName { get; set; }

    public string? Street { get; set; }

    public string? Number { get; set; }

    public string? City { get; set; }

    public int? ZipCode { get; set; }

    public DateTime? DayOfBirth { get; set; }

    public string? RegistryNumber { get; set; }

    public string? CategoryLicense { get; set; }
    public string? Login { get; set; }
    public string? Password { get; set; }

    public Driver()
    {
    }
    public Driver(string name, string insert, string firstName, string street, string number, string city, int zipCode, DateTime dayOfBirth, string registryNumber, string categoryLicense, string login, string password)
    {
        Name = name;
        Insert = insert;
        FirstName = firstName;
        Street = street;
        Number = number;
        City = city;
        ZipCode = zipCode;
        DayOfBirth = dayOfBirth;
        RegistryNumber = registryNumber;
        CategoryLicense = categoryLicense;
        Login = login;
        Password = password;
    }
}
