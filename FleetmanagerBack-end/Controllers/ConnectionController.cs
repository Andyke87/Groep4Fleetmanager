using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FleetManager.Models;
using Connections.Models;
namespace Back_end.Controllers;

[ApiController]
[Route("[controller]")]
public class ConnectionController : ControllerBase
{
    private readonly FleetManagerContext _dbContext;

    public ConnectionController(FleetManagerContext dBContext)
    {
        _dbContext = dBContext;
    }

    [HttpGet("AllConnections")]
    public IActionResult Get()
    {
        var connections = _dbContext.Connections
            .Include(c => c.IdDriverNavigation)
            .Include(c => c.IdGasCardNavigation)
            .Include(c => c.IdVehicleNavigation)
            .ToList();
        return Ok(connections); ;
    }
    [HttpGet("ConnectionByCode/{code}")]
    public IActionResult Get(int code)
    {
        var connection = _dbContext.Connections
            .Include(c => c.IdDriverNavigation)
            .Include(c => c.IdGasCardNavigation)
            .Include(c => c.IdVehicleNavigation)
            .FirstOrDefault(c => c.Id == code);
        return Ok(connection);
    }
    [HttpDelete("Connection/{code}")]
    public IActionResult Remove(int code)
    {
        var connection = _dbContext.Connections.FirstOrDefault(c => c.Id == code);
        if (connection != null)
        {
            _dbContext.Remove(connection);
            _dbContext.SaveChanges();
            return Ok(true);
        }
        return Ok(false);
    }
    [HttpPost("Connection")]
    public IActionResult Create([FromBody] Connection _connection)
    {
        // Controleer of er al een Connectie bestaat met de opgegeven Id
        var existingConnection = _dbContext.Connections.FirstOrDefault(c => c.Id == _connection.Id);

        // Als de Connectie al bestaat, geef een foutmelding terug
        if (existingConnection != null)
        {
            return BadRequest("A connection already exists with this Id.");
        }
        Connection newConnection = new(_connection.IdDriver, _connection.IdGasCard, _connection.IdVehicle);

        _dbContext.Connections.Add(newConnection);
        _dbContext.SaveChanges();

        return Ok(true);
    }

}
