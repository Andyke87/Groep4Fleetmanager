using FleetManager.Models;
using System.ComponentModel.DataAnnotations;

namespace FleetManager.Models;

public partial class Connection
{
    [Key]
    public int Id { get; set; }
    [Required]
    public int IdDriver { 
        get{
            return IdDriver;
        } 
        set{
            if (value < 1)
            {
                throw new ArgumentException("IdDriver must be greater than 0");
            }
            else 
            {
                IdDriver = value;
            }
        } 
    }
    [Required]
    public int IdGasCard { 
        get{
            return IdGasCard;
        } 
        set{
            if (value < 1)
            {
                throw new ArgumentException("IdGasCard must be greater than 0");
            }
            else 
            {
                IdGasCard = value;
            }
        } 
    }
    [Required]
    public int IdVehicle { 
        get{
            return IdVehicle;
        } 
        set{
            if (value < 1)
            {
                throw new ArgumentException("IdVehicle must be greater than 0");
            }
            else 
            {
                IdVehicle = value;
            }
        }
    }

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
