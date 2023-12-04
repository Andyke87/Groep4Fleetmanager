using Microsoft.AspNetCore.Mvc;
using FleetManager.Models;
using Swashbuckle.AspNetCore.Annotations;
using Microsoft.EntityFrameworkCore;
using Connections.Models;
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
    [SwaggerResponse(StatusCodes.Status200OK, "The list of all drivers", typeof(IEnumerable<Driver>))]
    [SwaggerResponse(StatusCodes.Status400BadRequest, "Invalid request")]
    [SwaggerResponse(StatusCodes.Status500InternalServerError, "Internal server error")]
    [SwaggerResponse(StatusCodes.Status503ServiceUnavailable, "Service unavailable")]
    public async Task<IActionResult> Get()
    {
        try
        {
            var drivers = await _dbContext.Drivers.ToListAsync();
            return Ok(drivers);
        }
        catch (Exception ex)
        {
            if (ex is DbUpdateException)
            {
                return StatusCode(400, "Invalid request");
            }
            if (ex is DbUpdateConcurrencyException)
            {
                return StatusCode(503, "Service is currently unavailable. Please try again later.");
            }
            else
            {
                return StatusCode(500, "Internal server error");
            }
        }
    }

    [HttpGet("DriverById/{id}")]
    [SwaggerResponse(StatusCodes.Status200OK, "The driver with given id", typeof(Driver))]
    [SwaggerResponse(StatusCodes.Status400BadRequest, "Invalid request")]
    [SwaggerResponse(StatusCodes.Status404NotFound, "Driver not found")]
    [SwaggerResponse(StatusCodes.Status500InternalServerError, "Internal server error")]
    [SwaggerResponse(StatusCodes.Status503ServiceUnavailable, "Service unavailable")]
    public async Task<IActionResult> GetByCode(int id)
    {
        try
        {
            var driver = await _dbContext.Drivers.FirstOrDefaultAsync(b => b.IdDriver == id);

            if (driver == null)
            {
                return NotFound("Driver not found");
            }

            return Ok(driver);
        }
        catch (Exception ex)
        {
            if (ex is DbUpdateException)
            {
                return StatusCode(400, "Invalid request");
            }
            if (ex is DbUpdateConcurrencyException)
            {
                return StatusCode(503, "Service is currently unavailable. Please try again later.");
            }
            else
            {
                return StatusCode(500, "Internal server error");
            }
        }
    }

    [HttpDelete("Driver/{id}")]
    [SwaggerResponse(StatusCodes.Status200OK, "The driver is removed", typeof(bool))]
    [SwaggerResponse(StatusCodes.Status400BadRequest, "Invalid request")]
    [SwaggerResponse(StatusCodes.Status404NotFound, "Driver not found")]
    [SwaggerResponse(StatusCodes.Status500InternalServerError, "Internal server error")]
    [SwaggerResponse(StatusCodes.Status503ServiceUnavailable, "Service unavailable")]
    public async Task<IActionResult> Remove(int id)
    {
        try
        {
            var driver = await _dbContext.Drivers.FirstOrDefaultAsync(b => b.IdDriver == id);

            if (driver == null)
            {
                return NotFound("Driver not found");
            }

            _dbContext.Drivers.Remove(driver);
            await _dbContext.SaveChangesAsync();

            return Ok("The driver is removed");
        }
        catch (Exception ex)
        {
            if (ex is DbUpdateException)
            {
                return StatusCode(400, "Invalid request");
            }
            if (ex is DbUpdateConcurrencyException)
            {
                return StatusCode(503, "Service is currently unavailable. Please try again later.");
            }
            else
            {
                return StatusCode(500, "Internal server error");
            }
        }
    }

    [HttpPatch("Driver/{id}")]
    [SwaggerResponse(StatusCodes.Status200OK, "The driver is updated", typeof(bool))]
    [SwaggerResponse(StatusCodes.Status400BadRequest, "Invalid request")]
    [SwaggerResponse(StatusCodes.Status404NotFound, "Driver not found")]
    [SwaggerResponse(StatusCodes.Status500InternalServerError, "Internal server error")]
    [SwaggerResponse(StatusCodes.Status503ServiceUnavailable, "Service unavailable")]
    public async Task<IActionResult> Update(int id, [FromBody] Driver _driver)
    {
        try
        {
            var driver = await _dbContext.Drivers.FirstOrDefaultAsync(c => c.IdDriver == id);

            if (driver != null)
            {
                if (_driver.Name != null)
                    driver.Name = _driver.Name;
                else driver.Name = driver.Name;

                if (_driver.Insert != null)
                    driver.Insert = _driver.Insert;
                else driver.Insert = driver.Insert;

                if (_driver.FirstName != null)
                    driver.FirstName = _driver.FirstName;
                else driver.FirstName = driver.FirstName;

                if (_driver.Street != null)
                    driver.Street = _driver.Street;
                else driver.Street = driver.Street;

                if (_driver.Number != null)
                    driver.Number = _driver.Number;
                else driver.Number = driver.Number;

                if (_driver.City != null)
                    driver.City = _driver.City;
                else driver.City = driver.City;

                if (_driver.ZipCode != null)
                    driver.ZipCode = _driver.ZipCode;
                else driver.ZipCode = driver.ZipCode;

                if (_driver.DayOfBirth != null)
                    driver.DayOfBirth = _driver.DayOfBirth;
                else driver.DayOfBirth = driver.DayOfBirth;

                if (_driver.RegistryNumber != null)
                    driver.RegistryNumber = _driver.RegistryNumber;
                else driver.RegistryNumber = driver.RegistryNumber;

                if (_driver.CategoryLicense != null)
                    driver.CategoryLicense = _driver.CategoryLicense;
                else driver.CategoryLicense = driver.CategoryLicense;

                await _dbContext.SaveChangesAsync();

                return Ok("The connection was updated");
            }

            return NotFound("Connection not found");
        }
        catch (Exception ex)
        {
            if (ex is DbUpdateException)
            {
                return StatusCode(400, "Invalid request");
            }
            if (ex is DbUpdateConcurrencyException)
            {
                return StatusCode(503, "Service is currently unavailable. Please try again later.");
            }
            else
            {
                return StatusCode(500, "Internal server error");
            }
        }
    }

    [HttpPost("Driver")]
    [SwaggerResponse(StatusCodes.Status201Created, "The driver was created", typeof(bool))]
    [SwaggerResponse(StatusCodes.Status400BadRequest, "Invalid request")]
    [SwaggerResponse(StatusCodes.Status404NotFound, "Driver not found")]
    [SwaggerResponse(StatusCodes.Status500InternalServerError, "Internal server error")]
    [SwaggerResponse(StatusCodes.Status503ServiceUnavailable, "Service unavailable")]
    public async Task<IActionResult> Create([FromBody] Driver _driver)
    {
        try
        {
            if (_driver == null)
            {
                return BadRequest("No data received");
            }

            if (_dbContext.Drivers.Any(d => d.IdDriver == _driver.IdDriver))
            {
                return BadRequest("The driver id already exists");
            }

            _dbContext.Drivers.Add(_driver);
            await _dbContext.SaveChangesAsync();

            return Ok("The driver was created");
        }
        catch (Exception ex)
        {
            if (ex is DbUpdateException)
            {
                return StatusCode(400, "Invalid request");
            }
            if (ex is DbUpdateConcurrencyException)
            {
                return StatusCode(503, "Service is currently unavailable. Please try again later.");
            }
            else
            {
                return StatusCode(500, "Internal server error");
            }
        }
    }

}
