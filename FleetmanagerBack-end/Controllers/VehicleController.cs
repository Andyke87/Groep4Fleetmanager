using Microsoft.AspNetCore.Mvc;
using FleetManager.Models;
using Swashbuckle.AspNetCore.Annotations;
using Microsoft.EntityFrameworkCore;
using AutoMapper;

namespace Back_end.Controllers;

[ApiController]
[Route("[controller]")]
public class VehicleController : ControllerBase
{
    private readonly FleetManagerContext _dbContext;
    private readonly ILogger<VehicleController>? _logger;
    private readonly IMapper _mapper;

    public VehicleController(FleetManagerContext dBContext, ILogger<VehicleController>? logger, IMapper mapper)
    {
        _dbContext = dBContext;
        _logger = logger;
        _mapper = mapper;
    }
    [HttpGet("AllVehicles")]
    [Produces("application/json")]
    [SwaggerResponse(StatusCodes.Status200OK, "The list of all vehicles", typeof(IEnumerable<Vehicle>))]
    [SwaggerResponse(StatusCodes.Status400BadRequest, "Invalid request")]
    [SwaggerResponse(StatusCodes.Status500InternalServerError, "Internal server error")]
    [SwaggerResponse(StatusCodes.Status503ServiceUnavailable, "Service unavailable")]
    public async Task<IActionResult> Get()
    {
        try
        {
            var vehicles = await _dbContext.Vehicles.ToListAsync();

            var vehicleDTOs = _mapper.Map<IEnumerable<VehicleDTO>>(vehicles);
            _logger?.LogInformation("Returning all vehicles");
            return Ok(vehicleDTOs);
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
    
    [HttpGet("VehicleById/{id}")]
    [Produces("application/json")]
    [SwaggerResponse(StatusCodes.Status200OK, "The vehicle with the given id", typeof(Vehicle))]
    [SwaggerResponse(StatusCodes.Status400BadRequest, "Invalid request")]
    [SwaggerResponse(StatusCodes.Status500InternalServerError, "Internal server error")]
    [SwaggerResponse(StatusCodes.Status503ServiceUnavailable, "Service unavailable")]
    public async Task<IActionResult> GetByCode(int id)
    {
        try
        {
            var vehicle = await _dbContext.Vehicles.FirstOrDefaultAsync(v => v.IdVehicle == id);

            if (vehicle == null)
            {
                _logger?.LogWarning("Vehicle not found");
                return NotFound("Vehicle not found");
            }

            var vehicleDTOs = _mapper.Map<IEnumerable<VehicleDTO>>(vehicle);
            _logger?.LogInformation("Returning vehicle with id {id}", id);
            return Ok(vehicleDTOs);
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
    
    [HttpDelete("Vehicle/{id}")]
    [Produces("application/json")]
    [SwaggerResponse(StatusCodes.Status200OK, "The vehicle is removed", typeof(bool))]
    [SwaggerResponse(StatusCodes.Status400BadRequest, "Invalid request")]
    [SwaggerResponse(StatusCodes.Status500InternalServerError, "Internal server error")]
    [SwaggerResponse(StatusCodes.Status503ServiceUnavailable, "Service unavailable")]
    public async Task<IActionResult> Remove(int id)
    {
        try
        {
            var vehicle = await _dbContext.Vehicles.FirstOrDefaultAsync(v => v.IdVehicle == id);

            if (vehicle == null)
            {
                _logger?.LogWarning("Vehicle not found");
                return NotFound("Vehicle not found");
            }

            _dbContext.Vehicles.Remove(vehicle);
            await _dbContext.SaveChangesAsync();

            var vehicleDTO = _mapper.Map<VehicleDTO>(vehicle);
            _logger?.LogInformation("Vehicle with id {id} is removed", id);
            return Ok(vehicleDTO);
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

    [HttpPatch("Vehicle/{id}")]
    [Consumes("application/json")]
    [SwaggerResponse(StatusCodes.Status200OK, "The vehicle has been updated", typeof(bool))]
    [SwaggerResponse(StatusCodes.Status400BadRequest, "Invalid request")]
    [SwaggerResponse(StatusCodes.Status500InternalServerError, "Internal server error")]
    [SwaggerResponse(StatusCodes.Status503ServiceUnavailable, "Service unavailable")]
    public async Task<IActionResult> Update(int id, [FromBody] VehicleDTO _vehicleDTO)
    {
        try
        {
            var vehicle = await _dbContext.Vehicles.FirstOrDefaultAsync(v => v.IdVehicle == id);

            if (vehicle != null)
            {// ?? staat voor null-coalescing operator en betekent: 
            // als de waarde links van de operator null is, geef dan de waarde rechts van de operator terug
                vehicle.Brand = _vehicleDTO.Brand ?? vehicle.Brand; 
                vehicle.Model = _vehicleDTO.Model ?? vehicle.Model;
                vehicle.ChassisNumber = _vehicleDTO.ChassisNumber ?? vehicle.ChassisNumber;
                vehicle.LicensePlate = _vehicleDTO.LicensePlate ?? vehicle.LicensePlate;
                vehicle.Fuel = _vehicleDTO.Fuel ?? vehicle.Fuel;
                vehicle.VehicleType = _vehicleDTO.VehicleType ?? vehicle.VehicleType;
                vehicle.Color = _vehicleDTO.Color ?? vehicle.Color;
                vehicle.NumberOfDoors = _vehicleDTO.NumberOfDoors ?? vehicle.NumberOfDoors;

                await _dbContext.SaveChangesAsync();
                _logger?.LogInformation("Vehicle with id {id} is updated", id);
                return Ok("The vehicle has been updated");
            }

            _logger?.LogWarning("Vehicle not found");
            return NotFound("Vehicle not found");
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

    [HttpPost("Vehicle")]
    [Consumes("application/json")]
    [SwaggerResponse(StatusCodes.Status201Created, "The vehicle was created", typeof(bool))]
    [SwaggerResponse(StatusCodes.Status400BadRequest, "Invalid request")]
    [SwaggerResponse(StatusCodes.Status500InternalServerError, "Internal server error")]
    [SwaggerResponse(StatusCodes.Status503ServiceUnavailable, "Service unavailable")]
    public async Task<IActionResult> Create([FromBody] VehicleDTO _vehicleDTO)
    {
        try
        {
            if (_vehicleDTO == null)
            {
                _logger?.LogWarning("No data received");
                return BadRequest("No data received");
            }

            if (_dbContext.Vehicles.Any(v => v.IdVehicle == _vehicleDTO.IdVehicle))
            {
                _logger?.LogWarning("The vehicle id already exists");
                return BadRequest("The vehicle id already exists");
            }

            var vehicle = _mapper.Map<Vehicle>(_vehicleDTO);

            _dbContext.Vehicles.Add(vehicle);
            await _dbContext.SaveChangesAsync();
            _logger?.LogInformation("Vehicle with id {id} is created", _vehicleDTO.IdVehicle);
            return Ok("The vehicle was created");
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
