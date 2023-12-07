using System.ComponentModel.DataAnnotations;
namespace FleetManager.Models;

public partial class Driver
{
    [Key]
    public int IdDriver { get; set; }

    public string? Name { get; set; }
    public string? Inserts { get; set; }
    public string? FirstName { get; set; }
    public string? Street { get; set; }
    public string? Number { get; set; }
    public string? City { get; set; }
    public int? ZipCode { get; set; }
    public DateTime? DayOfBirth { get; set; }
    public string? RegistryNumber { get; set; }
    public string? CategoryLicense { get; set; }


    public Driver()
    {
    }

    // Constructor met parameters
    public Driver(string name, string inserts, string firstName, string street, string number, string city, int zipCode, DateTime dayOfBirth, string registryNumber, string categoryLicense)
    {
        Name = name;
        Inserts = inserts;
        FirstName = firstName;
        Street = street;
        Number = number;
        City = city;
        ZipCode = zipCode;
        DayOfBirth = dayOfBirth;
        RegistryNumber = registryNumber;
        CategoryLicense = categoryLicense;
    }
}

