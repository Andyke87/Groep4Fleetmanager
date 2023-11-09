using FleetManager.Models;

namespace Connections.Models;

public partial class Connectie
{
    public int Id { get; set; }
    public int? IdBestuurder { get; set; }

    public int? IdTankkaart { get; set; }

    public int? IdVoertuig { get; set; }

    public virtual Bestuurder? IdBestuurderNavigation { get; set; }

    public virtual Tankkaart? IdTankkaartNavigation { get; set; }

    public virtual Voertuig? IdVoertuigNavigation { get; set; }
}
