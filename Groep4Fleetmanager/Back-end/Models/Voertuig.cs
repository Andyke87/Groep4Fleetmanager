﻿using System.ComponentModel.DataAnnotations;

namespace FleetManager.Models;

public partial class Voertuig
{
    [Key]
    public int IdVoertuig { get; set; }

    public string? Merk { get; set; }

    public string? Model { get; set; }

    public string? Chassisnummer { get; set; }

    public string? Nummerplaat { get; set; }

    public string? Brandstoftype { get; set; }

    public string? TypeVoertuig { get; set; }

    public string? Kleur { get; set; }

    public int? AantalDeuren { get; set; }

}