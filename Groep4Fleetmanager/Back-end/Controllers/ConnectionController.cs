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
    public IActionResult GetConnectie(int id)
    {
        var connectie = _dbContext.Connecties.FirstOrDefault(c => c.Id == id);

        if (connectie == null)
        {
            return NotFound();
        }

        return Ok(connectie);
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

        // Als de Connectie al bestaat, geef een foutmelding terug
        if (existingConnectie != null)
        {
            return BadRequest("Er bestaat al een Connectie met deze Id.");
        }

        _dbContext.Connecties.Add(_connectie);
        _dbContext.SaveChanges();

        return Ok(true);
    }

}
