using Microsoft.AspNetCore.Mvc;
using FleetManager.Models;
using Swashbuckle.AspNetCore.Annotations;
using Microsoft.EntityFrameworkCore;
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
    [SwaggerResponse(StatusCodes.Status200OK, "The list of all vehicles", typeof(IEnumerable<Vehicle>))]
    [SwaggerResponse(StatusCodes.Status400BadRequest, "Invalid request")]
    [SwaggerResponse(StatusCodes.Status500InternalServerError, "Internal server error")]
    [SwaggerResponse(StatusCodes.Status503ServiceUnavailable, "Service unavailable")]
    public async Task<IActionResult> Get()
    {
        try
        {
            var vehicles = await _dbContext.Vehicles.ToListAsync();
            return Ok(vehicles);
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
    [HttpGet("VehicleById/{id}")]
    [SwaggerResponse(StatusCodes.Status200OK, "The vehicle with the given id", typeof(Vehicle))]
    [SwaggerResponse(StatusCodes.Status400BadRequest, "Invalid request")]
    [SwaggerResponse(StatusCodes.Status404NotFound, "Vehicle not found")]
    [SwaggerResponse(StatusCodes.Status500InternalServerError, "Internal server error")]
    [SwaggerResponse(StatusCodes.Status503ServiceUnavailable, "Service unavailable")]
    public async Task<IActionResult> GetByCode(int id)
    {
        try
        {
            var vehicle = await _dbContext.Vehicles.FirstOrDefaultAsync(v => v.IdVehicle == id);

            if (vehicle == null)
            {
                return NotFound("Vehicle not found");
            }

            return Ok(vehicle);
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
    [HttpDelete("Vehicle/{id}")]
    [SwaggerResponse(StatusCodes.Status200OK, "The vehicle is removed", typeof(bool))]
    [SwaggerResponse(StatusCodes.Status400BadRequest, "Invalid request")]
    [SwaggerResponse(StatusCodes.Status404NotFound, "Vehicle not found")]
    [SwaggerResponse(StatusCodes.Status500InternalServerError, "Internal server error")]
    [SwaggerResponse(StatusCodes.Status503ServiceUnavailable, "Service unavailable")]
    public async Task<IActionResult> Remove(int id)
    {
        try
        {
            var vehicle = await _dbContext.Vehicles.FirstOrDefaultAsync(v => v.IdVehicle == id);

            if (vehicle == null)
            {
                return NotFound("Vehicle not found");
            }

            _dbContext.Vehicles.Remove(vehicle);
            await _dbContext.SaveChangesAsync();

            return Ok("The vehicle is removed");
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

    [HttpPatch("Vehicle/{id}")]
    [SwaggerResponse(StatusCodes.Status200OK, "The vehicle has been updated", typeof(bool))]
    [SwaggerResponse(StatusCodes.Status400BadRequest, "Invalid request")]
    [SwaggerResponse(StatusCodes.Status404NotFound, "Vehicle not found")]
    [SwaggerResponse(StatusCodes.Status500InternalServerError, "Internal server error")]
    [SwaggerResponse(StatusCodes.Status503ServiceUnavailable, "Service unavailable")]
    public async Task<IActionResult> Update(int id, [FromBody] Vehicle _vehicle)
    {
        try
        {
            var vehicle = await _dbContext.Vehicles.FirstOrDefaultAsync(v => v.IdVehicle == id);

            if (vehicle != null)
            {
                if (_vehicle.Brand != null)
                    vehicle.Brand = _vehicle.Brand;
                else vehicle.Brand = vehicle.Brand;

                if (_vehicle.Model != null)
                    vehicle.Model = _vehicle.Model;
                else vehicle.Model = vehicle.Model;

                if (_vehicle.ChassisNumber != null)
                    vehicle.ChassisNumber = _vehicle.ChassisNumber;
                else vehicle.ChassisNumber = vehicle.ChassisNumber;

                if (_vehicle.LicensePlate != null)
                    vehicle.LicensePlate = _vehicle.LicensePlate;
                else vehicle.LicensePlate = vehicle.LicensePlate;

                if (_vehicle.Fuel != null)
                    vehicle.Fuel = _vehicle.Fuel;
                else vehicle.Fuel = vehicle.Fuel;

                if (_vehicle.VehicleType != null)
                    vehicle.VehicleType = _vehicle.VehicleType;
                else vehicle.VehicleType = vehicle.VehicleType;

                if (_vehicle.Color != null)
                    vehicle.Color = _vehicle.Color;
                else vehicle.Color = vehicle.Color;

                if (_vehicle.NumberOfDoors != null)
                    vehicle.NumberOfDoors = _vehicle.NumberOfDoors;
                else vehicle.NumberOfDoors = vehicle.NumberOfDoors;

                await _dbContext.SaveChangesAsync();

                return Ok("The vehicle has been updated");
            }
            return NotFound("Vehicle not found");
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

    [HttpPost("Vehicle")]
    [SwaggerResponse(StatusCodes.Status201Created, "The vehicle was created", typeof(bool))]
    [SwaggerResponse(StatusCodes.Status400BadRequest, "Invalid request")]
    [SwaggerResponse(StatusCodes.Status409Conflict, "Conflict in data")]
    [SwaggerResponse(StatusCodes.Status500InternalServerError, "Internal server error")]
    [SwaggerResponse(StatusCodes.Status503ServiceUnavailable, "Service unavailable")]
    public async Task<IActionResult> Create([FromBody] Vehicle _vehicle)
    {
        try
        {
            if (_vehicle == null)
            {
                return BadRequest("No data received");
            }

            if (_dbContext.Vehicles.Any(v => v.IdVehicle == _vehicle.IdVehicle))
            {
                return BadRequest("The vehicle id already exists");
            }

            _dbContext.Vehicles.Add(_vehicle);
            await _dbContext.SaveChangesAsync();

            return Ok("The vehicle was created");
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
