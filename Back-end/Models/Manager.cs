using System;
using System.Collections.Generic;

namespace Back_end.Models;

public partial class Manager
{
    public int Id { get; set; }

    public int IdBestuurder { get; set; }

    public int? IdTankkaart { get; set; }

    public int? IdVoertuig { get; set; }
}
