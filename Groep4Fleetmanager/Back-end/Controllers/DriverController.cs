using Microsoft.AspNetCore.Mvc;
using FleetManager.Models;
namespace Back_end.Controllers;

[ApiController]
[Route("[controller]")]
public class DriverController : ControllerBase
{
    private readonly FleetManagerContext _dbContext;

    public DriverController(FleetManagerContext dBContext)
    {
        this._dbContext = dBContext;
    }
    [HttpGet("AllDrivers")]
    public IActionResult Get()
    {
        var driver = _dbContext.Drivers.ToList();
        return Ok(driver);
    }
    [HttpGet("DriverByCode/{code}")]
    public IActionResult Get(int code)
    {
        var driver = _dbContext.Drivers.FirstOrDefault(b => b.IdDriver == code);
        return Ok(driver);
    }
    [HttpDelete("Driver/{code}")]
    public IActionResult Remove(int code)
    {
        var driver = _dbContext.Drivers.FirstOrDefault(b => b.IdDriver == code);
        if (driver != null)
        {
            _dbContext.Remove(driver);
            _dbContext.SaveChanges();
            return Ok(true);
        }
        return Ok(false);
    }
    [HttpPost("Driver")]
    public IActionResult CreateDriver([FromBody] Driver _driver)
    {
        _dbContext.Drivers.FirstOrDefault(t => t.IdDriver == _driver.IdDriver);

        _dbContext.Drivers.Add(_driver);
        _dbContext.SaveChanges();

        return Ok(true);
    }
}
