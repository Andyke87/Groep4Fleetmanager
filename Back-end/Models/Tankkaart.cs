using System;
using System.Collections.Generic;

namespace Back_end.Models;

public partial class Tankkaart
{
    public int IdTankkaart { get; set; }

    public string Kaartnummer { get; set; } = null!;

    public DateTime Geldigheidsdatum { get; set; }

    public string? Pincode { get; set; }

    public string Brandstoffen { get; set; } = null!;

    public bool Geblokkeerd { get; set; }
}
