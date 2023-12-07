using FleetManager.Models;
using System.ComponentModel.DataAnnotations;

namespace FleetManager.Models;

public partial class Connection
{
    [Key]
    public int Id { get; set; }
    [Required]
    public int IdDriver { get; set; }
    [Required]
    public int IdGasCard {get; set;}
    [Required]
    public int IdVehicle {get; set;}

    public virtual Driver? IdDriverNavigation { get; set; }

    public virtual GasCard? IdGasCardNavigation { get; set; }

    public virtual Vehicle? IdVehicleNavigation { get; set; }

    public Connection()
    {
    }
    public Connection(int idDriver, int idGasCard, int idVehicle)
    {
        IdDriver = idDriver;
        IdGasCard = idGasCard;
        IdVehicle = idVehicle;
    }
}
