using System;
using System.Collections.Generic;

namespace FleetManager.Models;

public partial class Manager
{
    public int Id { get; set; }
    public int IdBestuurder { get; set; }

    public int? IdTankkaart { get; set; }

    public int? IdVoertuig { get; set; }

    public virtual Bestuurder IdBestuurderNavigation { get; set; } = null!;

    public virtual Tankkaart? IdTankkaartNavigation { get; set; }

    public virtual Voertuig? IdVoertuigNavigation { get; set; }
}
