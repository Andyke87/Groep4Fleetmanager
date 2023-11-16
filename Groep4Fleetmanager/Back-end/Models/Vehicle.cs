using System.ComponentModel.DataAnnotations;

namespace FleetManager.Models;

public partial class Vehicle
{
    [Key]
    public int IdVehicle { get; set; }

    public string? Brand { get; set; }

    public string? Model { get; set; }

    public string? ChassisNumber { get; set; }

    public string? LicensePlate { get; set; }

    public string? Fuel { get; set; }

    public string? VehicleType { get; set; }

    public string? Color { get; set; }

    public int? NumberOfDoors { get; set; }

    public Vehicle()
    {
    }
    public Vehicle(string brand, string model, string chassisNumber, string licensePlate, string fuel, string vehicleType, string color, int numberOfDoors)
    {

        Brand = brand;
        Model = model;
        ChassisNumber = chassisNumber;
        LicensePlate = licensePlate;
        Fuel = fuel;
        VehicleType = vehicleType;
        Color = color;
        NumberOfDoors = numberOfDoors;
    }

}
