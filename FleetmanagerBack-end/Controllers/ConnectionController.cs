using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FleetManager.Models;
using Connections.Models;
using Swashbuckle.AspNetCore.Annotations;
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
    [SwaggerResponse(StatusCodes.Status200OK, "The list of all connections", typeof(IEnumerable<Connection>))]
    [SwaggerResponse(StatusCodes.Status400BadRequest, "Invalid request")]
    [SwaggerResponse(StatusCodes.Status500InternalServerError, "Internal server error")]
    [SwaggerResponse(StatusCodes.Status503ServiceUnavailable, "Service unavailable")]
    public async Task<IActionResult> Get()
    {
        try
        {
            var connections = await _dbContext.Connections
                .Include(c => c.IdDriverNavigation)
                .Include(c => c.IdGasCardNavigation)
                .Include(c => c.IdVehicleNavigation)
                .ToListAsync();

            return Ok(connections);
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

    [HttpGet("ConnectionById/{id}")]
    [SwaggerResponse(StatusCodes.Status200OK, "The connection with the given id", typeof(Connection))]
    [SwaggerResponse(StatusCodes.Status400BadRequest, "Invalid request")]
    [SwaggerResponse(StatusCodes.Status404NotFound, "Connection not found")]
    [SwaggerResponse(StatusCodes.Status500InternalServerError, "Internal server error")]
    [SwaggerResponse(StatusCodes.Status503ServiceUnavailable, "Service unavailable")]
    public async Task<IActionResult> Get(int id)
    {
        try
        {
            var connection = await _dbContext.Connections
                .Include(c => c.IdDriverNavigation)
                .Include(c => c.IdGasCardNavigation)
                .Include(c => c.IdVehicleNavigation)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (connection == null)
            {
                return NotFound("Connection not found");
            }

            return Ok(connection);
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

    [HttpDelete("Connection/{id}")]
    [SwaggerResponse(StatusCodes.Status200OK, "The connection was removed", typeof(bool))]
    [SwaggerResponse(StatusCodes.Status400BadRequest, "Invalid request")]
    [SwaggerResponse(StatusCodes.Status404NotFound, "Connection not found")]
    [SwaggerResponse(StatusCodes.Status500InternalServerError, "Internal server error")]
    [SwaggerResponse(StatusCodes.Status503ServiceUnavailable, "Service unavailable")]
    public async Task<IActionResult> Remove(int id)
    {
        try
        {
            var connection = await _dbContext.Connections.FirstOrDefaultAsync(c => c.Id == id);

            if (connection != null)
            {
                _dbContext.Remove(connection);
                await _dbContext.SaveChangesAsync();

                return Ok("The connection was removed");
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
    
    [HttpPatch("Connection/{id}")]
    [SwaggerResponse(StatusCodes.Status200OK, "The connection was updated", typeof(bool))]
    [SwaggerResponse(StatusCodes.Status400BadRequest, "Invalid request")]
    [SwaggerResponse(StatusCodes.Status404NotFound, "Connection not found")]
    [SwaggerResponse(StatusCodes.Status500InternalServerError, "Internal server error")]
    [SwaggerResponse(StatusCodes.Status503ServiceUnavailable, "Service unavailable")]
    public async Task<IActionResult> Update(int id, [FromBody] Connection _connection)
    {
        try
        {
            var connection = await _dbContext.Connections.FirstOrDefaultAsync(c => c.Id == id);

            if (connection != null)
            {
                connection.IdDriver = _connection.IdDriver;
                connection.IdGasCard = _connection.IdGasCard;
                connection.IdVehicle = _connection.IdVehicle;

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

    [HttpPost("Connection")]
    [SwaggerResponse(StatusCodes.Status201Created, "The connection was created", typeof(bool))]
    [SwaggerResponse(StatusCodes.Status400BadRequest, "Invalid request")]
    [SwaggerResponse(StatusCodes.Status409Conflict, "Conflict in data")]
    [SwaggerResponse(StatusCodes.Status500InternalServerError, "Internal server error")]
    [SwaggerResponse(StatusCodes.Status503ServiceUnavailable, "Service unavailable")]
    public async Task<IActionResult> Create([FromBody] Connection _connection)
    {
        try
        {
            if (_connection == null)
            {
                return BadRequest("No data received");
            }

            // Controleren op duplicaten voor IdDriver
            if (_dbContext.Connections.Any(c => c.IdDriver == _connection.IdDriver))
            {
                return Conflict("A connection with the same IdDriver already exists.");
            }

            // Controleren op duplicaten voor IdGasCard
            if (_dbContext.Connections.Any(c => c.IdGasCard == _connection.IdGasCard))
            {
                return Conflict("A connection with the same IdGasCard already exists.");
            }

            // Controleren op duplicaten voor IdVehicle
            if (_dbContext.Connections.Any(c => c.IdVehicle == _connection.IdVehicle))
            {
                return Conflict("A connection with the same IdVehicle already exists.");
            }

            Connection newConnection = new(_connection.IdDriver, _connection.IdGasCard, _connection.IdVehicle);

            _dbContext.Connections.Add(newConnection);
            await _dbContext.SaveChangesAsync();

            return Ok("The connection was created");
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