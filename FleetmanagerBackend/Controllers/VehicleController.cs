using Microsoft.AspNetCore.Mvc;
using FleetManager.Models;
using Swashbuckle.AspNetCore.Annotations;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using FleetManager.Logging;

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

            _logger?.LogInformation($"{vehicles.Count} vehicles where found");
            Logging.LogToFile($"Timestamp: {DateTime.Now} \n \t {vehicles.Count} vehicles where found");
            return Ok(vehicleDTOs);
        }
        catch (Exception ex)
        {
            if (ex is DbUpdateException)
            {
                _logger?.LogError(ex, "Invalid request");
                Logging.LogToFile($"Timestamp: {DateTime.Now} \n \t Invalid request \n \t {ex.Message}");
                return StatusCode(400, ex.Message);
            }
            if (ex is DbUpdateConcurrencyException)
            {
                _logger?.LogError(ex, "Service is currently unavailable. Please try again later.");
                Logging.LogToFile($"Timestamp: {DateTime.Now} \n Service is currently unavailable. Please try again later \n \t {ex.Message}");
                return StatusCode(503, ex.Message);
            }
            else
            {
                _logger?.LogError(ex, "Internal server error");
                Logging.LogToFile($"Timestamp: {DateTime.Now} \n \t Internal server error \n \t {ex.Message}");
                return StatusCode(500, ex.Message);
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
            Logging.LogToFile($"Timestamp: {DateTime.Now} \n \t Returning vehicle with id {id}");
            return Ok(vehicleDTOs);
        }
        catch (Exception ex)
        {
            if (ex is DbUpdateException)
            {
                _logger?.LogError(ex, "Invalid request");
                Logging.LogToFile($"Timestamp: {DateTime.Now} \n \t Invalid request \n \t {ex.Message}");
                return StatusCode(400, ex.Message);
            }
            if (ex is DbUpdateConcurrencyException)
            {
                _logger?.LogError(ex, "Service is currently unavailable. Please try again later.");
                Logging.LogToFile($"Timestamp: {DateTime.Now} \n \t Service is currently unavailable. Please try again later \n \t {ex.Message}");
                return StatusCode(503, ex.Message);
            }
            else
            {
                _logger?.LogError(ex, "Internal server error");
                Logging.LogToFile($"Timestamp: {DateTime.Now} \n \t Internal server error \n \t {ex.Message}");
                return StatusCode(500, ex.Message);
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
            Logging.LogToFile($"Timestamp: {DateTime.Now} \n \t Vehicle with id {id} is removed");
            return Ok(vehicleDTO);
        }
        catch (Exception ex)
        {
            if (ex is DbUpdateException)
            {
                _logger?.LogError(ex, "Invalid request");
                Logging.LogToFile($"Timestamp: {DateTime.Now} \n \t Invalid request \n \t {ex.Message}");
                return StatusCode(400, ex.Message);
            }
            if (ex is DbUpdateConcurrencyException)
            {
                _logger?.LogError(ex, "Service is currently unavailable. Please try again later.");
                Logging.LogToFile($"Timestamp: {DateTime.Now} \n \t Service is currently unavailable. Please try again later \n \t {ex.Message}");
                return StatusCode(503, ex.Message);
            }
            else
            {
                _logger?.LogError(ex, "Internal server error");
                Logging.LogToFile($"Timestamp: {DateTime.Now} \n \t Internal server error \n \t {ex.Message}");
                return StatusCode(500, ex.Message);
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
            {
                vehicle.Brand = _vehicleDTO.Brand; 
                vehicle.Model = _vehicleDTO.Model ?? vehicle.Model;
                vehicle.ChassisNumber = _vehicleDTO.ChassisNumber ?? vehicle.ChassisNumber;
                vehicle.LicensePlate = _vehicleDTO.LicensePlate ?? vehicle.LicensePlate;
                vehicle.Fuel = _vehicleDTO.Fuel ?? vehicle.Fuel;
                vehicle.VehicleType = _vehicleDTO.VehicleType ?? vehicle.VehicleType;
                vehicle.Color = _vehicleDTO.Color ?? vehicle.Color;
                vehicle.NumberOfDoors = _vehicleDTO.NumberOfDoors;
                await _dbContext.SaveChangesAsync();

                _logger?.LogInformation("Vehicle with id {id} is updated", id);
                Logging.LogToFile($"Timestamp: {DateTime.Now} \n \t Vehicle with id {id} is updated");
                return Ok("The vehicle has been updated");
            }

            _logger?.LogWarning("Vehicle not found");
            Logging.LogToFile($"Timestamp: {DateTime.Now} \n \t Vehicle not found");
            return NotFound("Vehicle not found");
        }
        catch (Exception ex)
        {
            if (ex is DbUpdateException)
            {
                _logger?.LogError(ex, "Invalid request");
                Logging.LogToFile($"Timestamp: {DateTime.Now} \n \t Invalid request \n \t {ex.Message}");
                return StatusCode(400, ex.Message);
            }
            if (ex is DbUpdateConcurrencyException)
            {
                _logger?.LogError(ex, "Service is currently unavailable. Please try again later.");
                Logging.LogToFile($"Timestamp: {DateTime.Now} \n \t Service is currently unavailable. Please try again later \n \t {ex.Message}");
                return StatusCode(503, ex.Message);
            }
            else
            {
                _logger?.LogError(ex, "Internal server error");
                Logging.LogToFile($"Timestamp: {DateTime.Now} \n \t Internal server error \n \t {ex.Message}");
                return StatusCode(500, ex.Message);
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
                Logging.LogToFile($"Timestamp: {DateTime.Now} \n \t No data received");
                return BadRequest("No data received");
            }
            if (_dbContext.Vehicles.Any(v => v.IdVehicle == _vehicleDTO.IdVehicle))
            {
                _logger?.LogWarning("The vehicle id already exists");
                Logging.LogToFile($"Timestamp: {DateTime.Now} \n \t The vehicle id already exists");
                return BadRequest("The vehicle id already exists");
            }
            var vehicle = _mapper.Map<Vehicle>(_vehicleDTO);
            _dbContext.Vehicles.Add(vehicle);
            await _dbContext.SaveChangesAsync();

            _logger?.LogInformation("Vehicle with id {id} is created", _vehicleDTO.IdVehicle);
            Logging.LogToFile($"Timestamp: {DateTime.Now} \n \t Vehicle with id {_vehicleDTO.IdVehicle} is created");
            return Ok("The vehicle was created");
        }
        catch (Exception ex)
        {
            if (ex is DbUpdateException)
            {
                _logger?.LogError(ex, "Invalid request");
                Logging.LogToFile($"Timestamp: {DateTime.Now} \n \t Invalid request \n \t {ex.Message}");
                return StatusCode(400, ex.Message);
            }
            if (ex is DbUpdateConcurrencyException)
            {
                _logger?.LogError(ex, "Service is currently unavailable. Please try again later.");
                Logging.LogToFile($"Timestamp: {DateTime.Now} \n \t Service is currently unavailable. Please try again later \n \t {ex.Message}");
                return StatusCode(503, ex.Message);
            }
            else
            {
                _logger?.LogError(ex, "Internal server error");
                Logging.LogToFile($"Timestamp: {DateTime.Now} \n \t Internal server error \n \t {ex.Message}");
                return StatusCode(500, ex.Message);
            }
        }
    }
}
