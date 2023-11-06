using Microsoft.AspNetCore.Mvc;
using FleetManager.Models;
namespace Back_end.Controllers;

[ApiController]
[Route("[controller]")]
public class FleetManagerController : ControllerBase
{
    private readonly FleetManagerContext _DbContext;

    public FleetManagerController(FleetManagerContext dBContext)
    {
        this._DbContext = dBContext;
    }
    #region GasCard
    [HttpGet("GetAllGasCards")]
    public IActionResult GetGasCard()
    {
        var tankkaart = _DbContext.Tankkaarts.ToList();
        return Ok(tankkaart);
    }
    [HttpGet("GetGasCardByCode/{code}")]
    public IActionResult GetGasCardByCode(int code)
    {
        var tankkaart = _DbContext.Tankkaarts.FirstOrDefault(t => t.IdTankkaart == code);
        return Ok(tankkaart);
    }
    [HttpDelete("RemoveGasCard/{code}")]
    public IActionResult RemoveGasCard(int code)
    {
        var tankkaart = _DbContext.Tankkaarts.FirstOrDefault(t => t.IdTankkaart == code);
        if (tankkaart != null)
        {
            this._DbContext.Remove(tankkaart);
            this._DbContext.SaveChanges();
            return Ok(true);
        }
        return Ok(false);
    }
    [HttpPost("CreateGasCard")]
    public IActionResult CreateGasCard([FromBody] Tankkaart _tankkaart)
    {
        var tankkaart = this._DbContext.Tankkaarts.FirstOrDefault(t => t.IdTankkaart == _tankkaart.IdTankkaart);
        if (tankkaart != null)
        {
            tankkaart.Kaartnummer = _tankkaart.Kaartnummer;
            tankkaart.Geldigheidsdatum = _tankkaart.Geldigheidsdatum;
            tankkaart.Pincode = _tankkaart.Pincode;
            tankkaart.Brandstoffen = _tankkaart.Brandstoffen;
            tankkaart.Geblokkeerd = _tankkaart.Geblokkeerd;
        }
        else
        {
            this._DbContext.Tankkaarts.Add(_tankkaart);
            this._DbContext.SaveChanges();
        }
        return Ok(true);
    }
    #endregion
    #region Driver
    [HttpGet("GetAllDrivers")]
    public IActionResult GetDriver()
    {
        var bestuurder = _DbContext.Bestuurders.ToList();
        return Ok(bestuurder);
    }
    [HttpGet("GetDriverByCode/{code}")]
    public IActionResult GetDriverByCode(int code)
    {
        var bestuurder = _DbContext.Bestuurders.FirstOrDefault(t => t.IdBestuurder == code);
        return Ok(bestuurder);
    }
    [HttpDelete("RemoveDriver/{code}")]
    public IActionResult RemoveDriver(int code)
    {
        var bestuurder = _DbContext.Bestuurders.FirstOrDefault(t => t.IdBestuurder == code);
        if (bestuurder != null)
        {
            this._DbContext.Remove(bestuurder);
            this._DbContext.SaveChanges();
            return Ok(true);
        }
        return Ok(false);
    }
    [HttpPost("CreateDriver")]
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
    #endregion
    #region Vehicle
    [HttpGet("GetAllVehicles")]
    public IActionResult GetVehicle()
    {
        var voertuig = _DbContext.Voertuigs.ToList();
        return Ok(voertuig);
    }
    [HttpGet("GetVehicleByCode/{code}")]
    public IActionResult GetVehicleByCode(int code)
    {
        var voertuig = _DbContext.Voertuigs.FirstOrDefault(t => t.IdVoertuig == code);
        return Ok(voertuig);
    }
    [HttpDelete("RemoveVehicle/{code}")]
    public IActionResult RemoveVehicle(int code)
    {
        var voertuig = _DbContext.Voertuigs.FirstOrDefault(t => t.IdVoertuig == code);
        if (voertuig != null)
        {
            this._DbContext.Remove(voertuig);
            this._DbContext.SaveChanges();
            return Ok(true);
        }
        return Ok(false);
    }
    [HttpPost("CreateVehicle")]
    public IActionResult CreateVehicle([FromBody] Voertuig _voertuig)
    {
        var voertuig = this._DbContext.Voertuigs.FirstOrDefault(t => t.IdVoertuig == _voertuig.IdVoertuig);
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
            this._DbContext.Voertuigs.Add(_voertuig);
            this._DbContext.SaveChanges();
        }
        return Ok(true);
    }
    #endregion
    #region Connections
    [HttpGet("GetAllConnections")]
    public IActionResult GetConnections()
    {
        var manager = _DbContext.Managers.ToList();
        return Ok(manager);
    }
    [HttpGet("GetConnectionByCode/{code}")]
    public IActionResult GetConnectionByCode(int code)
    {
        var manager = _DbContext.Managers.FirstOrDefault(t => t.Id == code);
        return Ok(manager);
    }
    [HttpDelete("RemoveConnection/{code}")]
    public IActionResult RemoveConnection(int code)
    {
        var manager = _DbContext.Managers.FirstOrDefault(t => t.Id == code);
        if (manager != null)
        {
            this._DbContext.Remove(manager);
            this._DbContext.SaveChanges();
            return Ok(true);
        }
        return Ok(false);
    }
    [HttpPost("CreateConnection")]
    public IActionResult CreateConnection([FromBody] Manager _manager)
    {
        var manager = this._DbContext.Managers.FirstOrDefault(t => t.Id == _manager.Id);
        if (manager != null)
        {
            manager.IdBestuurder = _manager.IdBestuurder;
            manager.IdTankkaart = _manager.IdTankkaart;
            manager.IdVoertuig = _manager.IdVoertuig;
        }
        else
        {
            this._DbContext.Managers.Add(_manager);
            this._DbContext.SaveChanges();
        }
        return Ok(true);
    }
    #endregion
}
