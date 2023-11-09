namespace FleetManager.Models;

public partial class Bestuurder
{

    public int IdBestuurder { get; set; }

    public string? Naam { get; set; }

    public string? Voornaam { get; set; }

    public string? Straat { get; set; }

    public string? Huisnummer { get; set; }

    public string? Stad { get; set; }

    public int? Postcode { get; set; }

    public DateTime? Geboortedatum { get; set; }

    public string? Rijksregisternummer { get; set; }

    public string? CategorieRijbewijs { get; set; }
    public string? Login { get; set; }
    public string? Paswoord { get; set; }
}
