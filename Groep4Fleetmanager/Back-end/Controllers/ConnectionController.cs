using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FleetManager.Models;
using Connections.Models;
namespace Back_end.Controllers;

[ApiController]
[Route("[controller]")]
public class ConnectieController : ControllerBase
{
    private readonly FleetManagerContext _dbContext;

    public ConnectieController(FleetManagerContext dBContext)
    {
        _dbContext = dBContext;
    }

    [HttpGet("AlleConnecties")]
    public IActionResult Get()
    {
        var connecties = _dbContext.Connecties
            .Include(c => c.IdBestuurderNavigation)
            .Include(c => c.IdTankkaartNavigation)
            .Include(c => c.IdVoertuigNavigation)
            .ToList();
        return Ok(connecties); ;
    }
    [HttpGet("ConnectieBijCode/{code}")]
    public IActionResult Get(int code)
    {
        var connectie = _dbContext.Connecties
            .Include(c => c.IdBestuurderNavigation)
            .Include(c => c.IdTankkaartNavigation)
            .Include(c => c.IdVoertuigNavigation)
            .FirstOrDefault(c => c.Id == code);
        return Ok(connectie);
    }
    [HttpDelete("Connectie/{code}")]
    public IActionResult Remove(int code)
    {
        var connectie = _dbContext.Connecties.FirstOrDefault(c => c.Id == code);
        if (connectie != null)
        {
            _dbContext.Remove(connectie);
            _dbContext.SaveChanges();
            return Ok(true);
        }
        return Ok(false);
    }
    [HttpPost("Connectie")]
    public IActionResult Create([FromBody] Connectie _connectie)
    {
        // Controleer of er al een Connectie bestaat met de opgegeven Id
        var existingConnectie = _dbContext.Connecties.FirstOrDefault(c => c.Id == _connectie.Id);

        if (existingConnectie != null)
        {
            // Als er al een Connectie bestaat met deze Id, geef een foutmelding terug
            return BadRequest("Een Connectie met dezelfde Id bestaat al.");
        }

        // Maak een nieuwe Connectie aan op basis van de opgegeven Id's
        var newConnectie = new Connectie
        {
            Id = _connectie.Id,
            IdBestuurder = _connectie.IdBestuurder,
            IdTankkaart = _connectie.IdTankkaart,
            IdVoertuig = _connectie.IdVoertuig
            // Voeg hier andere eigenschappen toe indien nodig
        };

        // Voeg de nieuwe Connectie toe aan de database
        _dbContext.Connecties.Add(newConnectie);
        _dbContext.SaveChanges();

        return Ok(true);
    }

}
