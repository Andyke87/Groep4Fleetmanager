using Microsoft.AspNetCore.Mvc;
using FleetManager.Models;
namespace Back_end.Controllers;

[ApiController]
[Route("[controller]")]
public class VehicleController : ControllerBase
{
    private readonly FleetManagerContext _dbContext;

    public VehicleController(FleetManagerContext dBContext)
    {
        this._dbContext = dBContext;
    }
    [HttpGet("AllVehicles")]
    public IActionResult Get()
    {
        var vehicle = _dbContext.Vehicles.ToList();
        return Ok(vehicle);
    }
    [HttpGet("VehicleByCode/{code}")]
    public IActionResult GetByCode(int code)
    {
        var vehicle = _dbContext.Vehicles.FirstOrDefault(v => v.IdVehicle == code);
        return Ok(vehicle);
    }
    [HttpDelete("Vehicle/{code}")]
    public IActionResult Remove(int code)
    {
        var vehicle = _dbContext.Vehicles.FirstOrDefault(v => v.IdVehicle == code);
        if (vehicle != null)
        {
            _dbContext.Remove(vehicle);
            _dbContext.SaveChanges();
            return Ok(true);
        }
        return Ok(false);
    }
    [HttpPost("Vehicle")]
    public IActionResult Create([FromBody] Vehicle _vehicle)
    {
        _dbContext.Vehicles.FirstOrDefault(t => t.IdVehicle == _vehicle.IdVehicle);

        _dbContext.Vehicles.Add(_vehicle);
        _dbContext.SaveChanges();

        return Ok(true);
    }
}
