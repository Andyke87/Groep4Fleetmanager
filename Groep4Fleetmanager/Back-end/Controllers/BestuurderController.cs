using Microsoft.AspNetCore.Mvc;
using FleetManager.Models;
namespace Back_end.Controllers;

[ApiController]
[Route("[controller]")]
public class BestuurderController : ControllerBase
{
    private readonly FleetManagerContext _DbContext;

    public BestuurderController(FleetManagerContext dBContext)
    {
        this._DbContext = dBContext;
    }
    [HttpGet("AlleBestuurders")]
    public IActionResult Get()
    {
        var bestuurder = _DbContext.Bestuurders.ToList();
        return Ok(bestuurder);
    }
    [HttpGet("BestuurderBijCode/{code}")]
    public IActionResult Get(int code)
    {
        var bestuurder = _DbContext.Bestuurders.FirstOrDefault(b => b.IdBestuurder == code);
        return Ok(bestuurder);
    }
    [HttpDelete("Bestuurder/{code}")]
    public IActionResult Remove(int code)
    {
        var bestuurder = _DbContext.Bestuurders.FirstOrDefault(b => b.IdBestuurder == code);
        if (bestuurder != null)
        {
            _DbContext.Remove(bestuurder);
            _DbContext.SaveChanges();
            return Ok(true);
        }
        return Ok(false);
    }
    [HttpPost("Bestuurder")]
    public IActionResult CreateDriver([FromBody] Bestuurder _bestuurder)
    {
        var bestuurder = this._DbContext.Bestuurders.FirstOrDefault(t => t.IdBestuurder == _bestuurder.IdBestuurder);
        if (bestuurder != null)
        {
            bestuurder.Naam = _bestuurder.Naam;
            bestuurder.Voornaam = _bestuurder.Voornaam;
            bestuurder.Straat = _bestuurder.Straat;
            bestuurder.Huisnummer = _bestuurder.Huisnummer;
            bestuurder.Stad = _bestuurder.Stad;
            bestuurder.Postcode = _bestuurder.Postcode;
            bestuurder.Geboortedatum = _bestuurder.Geboortedatum;
            bestuurder.Rijksregisternummer = _bestuurder.Rijksregisternummer;
            bestuurder.CategorieRijbewijs = _bestuurder.CategorieRijbewijs;
            bestuurder.Login = _bestuurder.Login;
            bestuurder.Paswoord = _bestuurder.Paswoord;
        }
        else
        {
            this._DbContext.Bestuurders.Add(_bestuurder);
            this._DbContext.SaveChanges();
        }
        return Ok(true);
    }
}
