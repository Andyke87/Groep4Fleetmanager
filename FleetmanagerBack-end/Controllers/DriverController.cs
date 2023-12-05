using Microsoft.AspNetCore.Mvc;
using FleetManager.Models;
using Swashbuckle.AspNetCore.Annotations;
using Microsoft.EntityFrameworkCore;
using AutoMapper;

namespace Back_end.Controllers;

[ApiController]
[Route("[controller]")]
public class DriverController : ControllerBase
{
    private readonly FleetManagerContext _dbContext;
    private readonly ILogger<DriverController>? _logger;
    private readonly IMapper _mapper;

    public DriverController(FleetManagerContext dBContext, ILogger<DriverController>? logger, IMapper mapper)
    {
        _dbContext = dBContext;
        _logger = logger;
        _mapper = mapper;
    }
    [HttpGet("AllDrivers")]
    [Produces("application/json")]
    [SwaggerResponse(StatusCodes.Status200OK, "The list of all drivers", typeof(IEnumerable<Driver>))]
    [SwaggerResponse(StatusCodes.Status400BadRequest, "Invalid request")]
    [SwaggerResponse(StatusCodes.Status500InternalServerError, "Internal server error")]
    [SwaggerResponse(StatusCodes.Status503ServiceUnavailable, "Service unavailable")]
    public async Task<IActionResult> Get()
    {
        try
        {
            var drivers = await _dbContext.Drivers.ToListAsync();
            var driverDTOs = _mapper.Map<IEnumerable<DriverDTO>>(drivers);

            return Ok(driverDTOs);
        }
        catch (Exception ex)
        {
            if (ex is DbUpdateException)
            {
                _logger?.LogError(ex, "Invalid request");
                return StatusCode(400, "Invalid request");
            }
            if (ex is DbUpdateConcurrencyException)
            {
                _logger?.LogError(ex, "Service is currently unavailable. Please try again later.");
                return StatusCode(503, "Service is currently unavailable. Please try again later.");
            }
            else
            {
                _logger?.LogError(ex, "Internal server error");
                return StatusCode(500, "Internal server error");
            }
        }
    }

    [HttpGet("DriverById/{id}")]
    [Produces("application/json")]
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
                _logger?.LogWarning("Driver not found");
                return NotFound("Driver not found");
            }

            var driverDTO = _mapper.Map<DriverDTO>(driver);

            return Ok(driverDTO);
        }
        catch (Exception ex)
        {
            if (ex is DbUpdateException)
            {
                _logger?.LogError(ex, "Invalid request");
                return StatusCode(400, "Invalid request");
            }
            if (ex is DbUpdateConcurrencyException)
            {
                _logger?.LogError(ex, "Service is currently unavailable. Please try again later.");
                return StatusCode(503, "Service is currently unavailable. Please try again later.");
            }
            else
            {
                _logger?.LogError(ex, "Internal server error");
                return StatusCode(500, "Internal server error");
            }
        }
    }

    [HttpDelete("Driver/{id}")]
    [Produces("application/json")]
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
                _logger?.LogWarning("Driver not found");
                return NotFound("Driver not found");
            }
                _dbContext.Drivers.Remove(driver);
                await _dbContext.SaveChangesAsync();
                
            var driverDTO = _mapper.Map<DriverDTO>(driver);

            return Ok(driverDTO);

        }
        catch (Exception ex)
        {
            if (ex is DbUpdateException)
            {
                _logger?.LogError(ex, "Invalid request");
                return StatusCode(400, "Invalid request");
            }
            if (ex is DbUpdateConcurrencyException)
            {
                _logger?.LogError(ex, "Service is currently unavailable. Please try again later.");
                return StatusCode(503, "Service is currently unavailable. Please try again later.");
            }
            else
            {
                _logger?.LogError(ex, "Internal server error");
                return StatusCode(500, "Internal server error");
            }
        }
    }

    [HttpPatch("Driver/{id}")]
    [Consumes("application/json")]
    [SwaggerResponse(StatusCodes.Status200OK, "The driver is updated", typeof(bool))]
    [SwaggerResponse(StatusCodes.Status400BadRequest, "Invalid request")]
    [SwaggerResponse(StatusCodes.Status404NotFound, "Driver not found")]
    [SwaggerResponse(StatusCodes.Status500InternalServerError, "Internal server error")]
    [SwaggerResponse(StatusCodes.Status503ServiceUnavailable, "Service unavailable")]
    public async Task<IActionResult> Update(int id, [FromBody] DriverDTO _driverDTO)
    {
        try
        {
            var driver = await _dbContext.Drivers.FirstOrDefaultAsync(c => c.IdDriver == id);

            if (driver != null)
            {
                _mapper.Map(_driverDTO, driver);

                await _dbContext.SaveChangesAsync();

                return Ok("The driver was updated");
            }

            _logger?.LogWarning("Driver not found");
            return NotFound("Driver not found");
        }
        catch (Exception ex)
        {
            if (ex is DbUpdateException)
            {
                _logger?.LogError(ex, "Invalid request");
                return StatusCode(400, "Invalid request");
            }
            if (ex is DbUpdateConcurrencyException)
            {
                _logger?.LogError(ex, "Service is currently unavailable. Please try again later.");
                return StatusCode(503, "Service is currently unavailable. Please try again later.");
            }
            else
            {
                _logger?.LogError(ex, "Internal server error");
                return StatusCode(500, "Internal server error");
            }
        }
    }

    [HttpPost("Driver")]
    [Consumes("application/json")]
    [SwaggerResponse(StatusCodes.Status201Created, "The driver was created", typeof(bool))]
    [SwaggerResponse(StatusCodes.Status400BadRequest, "Invalid request")]
    [SwaggerResponse(StatusCodes.Status404NotFound, "Driver not found")]
    [SwaggerResponse(StatusCodes.Status500InternalServerError, "Internal server error")]
    [SwaggerResponse(StatusCodes.Status503ServiceUnavailable, "Service unavailable")]
    public async Task<IActionResult> Create([FromBody] DriverDTO _driverDTO)
    {
        try
        {
            if (_driverDTO == null)
            {
                _logger?.LogWarning("No data received");
                return BadRequest("No data received");
            }

            var driver = _mapper.Map<Driver>(_driverDTO);

            if (_dbContext.Drivers.Any(d => d.IdDriver == driver.IdDriver))
            {
                _logger?.LogWarning("The driver id already exists");
                return BadRequest("The driver id already exists");
            }

            _dbContext.Drivers.Add(driver);
            await _dbContext.SaveChangesAsync();

            return Ok("The driver was created");
        }
        catch (Exception ex)
        {
            if (ex is DbUpdateException)
            {
                _logger?.LogError(ex, "Invalid request");
                return StatusCode(400, "Invalid request");
            }
            if (ex is DbUpdateConcurrencyException)
            {
                _logger?.LogError(ex, "Service is currently unavailable. Please try again later.");
                return StatusCode(503, "Service is currently unavailable. Please try again later.");
            }
            else
            {
                _logger?.LogError(ex, "Internal server error");
                return StatusCode(500, "Internal server error");
            }
        }
    }

}
