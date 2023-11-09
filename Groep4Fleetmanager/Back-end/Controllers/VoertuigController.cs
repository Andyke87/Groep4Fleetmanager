using Microsoft.AspNetCore.Mvc;
using FleetManager.Models;
namespace Back_end.Controllers;

[ApiController]
[Route("[controller]")]
public class VoertuigController : ControllerBase
{
    private readonly FleetManagerContext _DbContext;

    public VoertuigController(FleetManagerContext dBContext)
    {
        this._DbContext = dBContext;
    }
    [HttpGet("AlleVoertuigen")]
    public IActionResult Get()
    {
        var vehicle = _DbContext.Voertuigen.ToList();
        return Ok(vehicle);
    }
    [HttpGet("VoertuigBCode/{code}")]
    public IActionResult GetByCode(int code)
    {
        var vehicle = _DbContext.Voertuigen.FirstOrDefault(v => v.IdVoertuig == code);
        return Ok(vehicle);
    }
    [HttpDelete("Voertuig/{code}")]
    public IActionResult Remove(int code)
    {
        var vehicle = _DbContext.Voertuigen.FirstOrDefault(v => v.IdVoertuig == code);
        if (vehicle != null)
        {
            _DbContext.Remove(vehicle);
            _DbContext.SaveChanges();
            return Ok(true);
        }
        return Ok(false);
    }
    [HttpPost("Voertuig")]
    public IActionResult Create([FromBody] Voertuig _voertuig)
    {
        var voertuig = _DbContext.Voertuigen.FirstOrDefault(t => t.IdVoertuig == _voertuig.IdVoertuig);
        if (voertuig != null)
        {
            voertuig.Merk = _voertuig.Merk;
            voertuig.Model = _voertuig.Model;
            voertuig.Chassisnummer = _voertuig.Chassisnummer;
            voertuig.Nummerplaat = _voertuig.Nummerplaat;
            voertuig.Brandstoftype = _voertuig.Brandstoftype;
            voertuig.TypeVoertuig = _voertuig.TypeVoertuig;
            voertuig.Kleur = _voertuig.Kleur;
            voertuig.AantalDeuren = _voertuig.AantalDeuren;
        }
        else
        {
            _DbContext.Voertuigen.Add(_voertuig);
            _DbContext.SaveChanges();
        }
        return Ok(true);
    }
}
