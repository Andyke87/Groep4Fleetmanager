using FleetManager.Models;
using System.ComponentModel.DataAnnotations;

namespace Connections.Models;

public partial class Connection
{
    [Key]
    public int Id { get; set; }
    public int IdDriver { get; set; }

    public int IdGasCard { get; set; }

    public int IdVehicle { get; set; }

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
