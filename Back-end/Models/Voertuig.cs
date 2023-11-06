using System;
using System.Collections.Generic;

namespace Back_end.Models;

public partial class Voertuig
{
    public int IdVoertuig { get; set; }

    public string Merk { get; set; } = null!;

    public string? Model { get; set; }

    public string Chassisnummer { get; set; } = null!;

    public string Nummerplaat { get; set; } = null!;

    public string Brandstoftype { get; set; } = null!;

    public string? TypeVoertuig { get; set; }

    public string? Kleur { get; set; }

    public int? AantalDeuren { get; set; }
}
