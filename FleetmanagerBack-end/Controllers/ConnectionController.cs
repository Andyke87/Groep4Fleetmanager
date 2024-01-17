using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FleetManager.Models;
using Swashbuckle.AspNetCore.Annotations;
using AutoMapper;
using FleetManager.Logging;

namespace Back_end.Controllers;

[ApiController]
[Route("[controller]")]
public class ConnectionController : ControllerBase
{
    private readonly FleetManagerContext _dbContext; 
    private readonly ILogger<ConnectionController>? _logger;
    private readonly IMapper _mapper;

    public ConnectionController(FleetManagerContext dBContext, ILogger<ConnectionController>? logger, IMapper mapper)
    {
        _dbContext = dBContext;
        _logger = logger;
        _mapper = mapper;
    }

    [HttpGet("AllConnections")]
    [Produces("application/json")]
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

            var connectionDTOs = _mapper.Map<IEnumerable<ConnectionDTO>>(connections);
            
            _logger?.LogInformation($"{connections.Count} connections where found");
            Logging.LogToFile($"Timestamp: {DateTime.Now} \n \t  {connections.Count} connections where found");
            return Ok(connectionDTOs);
        }
        catch (Exception ex)
        {
            if (ex is DbUpdateException)
            {
                _logger?.LogError(ex, "Invalid request");
                Logging.LogToFile($"Timestamp: {DateTime.Now} \n \t  Invalid request \n \t {ex.Message}");
                return StatusCode(400, ex.Message);
            }
            if (ex is DbUpdateConcurrencyException)
            {
                _logger?.LogError(ex, "Service is currently unavailable. Please try again later.");
                Logging.LogToFile($"Timestamp: {DateTime.Now} \n \t  Service is currently unavailable. Please try again later \n \t {ex.Message}");
                return StatusCode(503, ex.Message);
            }
            else
            {
                _logger?.LogError(ex, "Internal server error");
                Logging.LogToFile($"Timestamp: {DateTime.Now} \n \t  Internal server error \n \t {ex.Message}");
                return StatusCode(500, ex.Message);
            }
        }
    }

    [HttpGet("ConnectionById/{id}")]
    [Produces("application/json")]
    [SwaggerResponse(StatusCodes.Status200OK, "The connection with the given id", typeof(Connection))]
    [SwaggerResponse(StatusCodes.Status400BadRequest, "Invalid request")]
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
                _logger?.LogInformation("Connection not found");
                Logging.LogToFile($"Timestamp: {DateTime.Now} \n \t  Connection not found");
                return NotFound("Connection not found");
            }
            var connectionDTO = _mapper.Map<ConnectionDTO>(connection);
            _logger?.LogInformation("Returned connection with id: {id}", id);

            Logging.LogToFile($"Timestamp: {DateTime.Now} \n \t  Returned connection with id: {id}");
            return Ok(connectionDTO);
        }
        catch (Exception ex)
        {
            if (ex is DbUpdateException)
            {
                _logger?.LogError(ex, "Invalid request");
                Logging.LogToFile($"Timestamp: {DateTime.Now} \n \t  Invalid request \n \t {ex.Message}");
                return StatusCode(400, ex.Message);
            }
            if (ex is DbUpdateConcurrencyException)
            {
                _logger?.LogError(ex, "Service is currently unavailable. Please try again later.");
                Logging.LogToFile($"Timestamp: {DateTime.Now} \n \t  Service is currently unavailable. Please try again later \n \t {ex.Message}");
                return StatusCode(503, ex.Message);
            }
            else
            {
                _logger?.LogError(ex, "Internal server error");
                Logging.LogToFile($"Timestamp: {DateTime.Now} \n \t  Internal server error \n \t {ex.Message}");
                return StatusCode(500, ex.Message);
            }
        }
    }

    [HttpDelete("Connection/{id}")]
    [Produces("application/json")]
    [SwaggerResponse(StatusCodes.Status200OK, "The connection was removed", typeof(bool))]
    [SwaggerResponse(StatusCodes.Status400BadRequest, "Invalid request")]
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

                _logger?.LogInformation("Connection removed");
                Logging.LogToFile($"Timestamp: {DateTime.Now} \n \t  Connection removed");
                return Ok(connection);
            }
            _logger?.LogInformation("Connection not found");
            Logging.LogToFile($"Timestamp: {DateTime.Now} \n \t  Connection not found");
            return NotFound("Connection not found");
        }
        catch (Exception ex)
        {
            if (ex is DbUpdateException)
            {
                _logger?.LogError(ex, "Invalid request");
                Logging.LogToFile($"Timestamp: {DateTime.Now} \n \t  Invalid request \n \t {ex.Message}");
                return StatusCode(400, ex.Message);
            }
            if (ex is DbUpdateConcurrencyException)
            {
                _logger?.LogError(ex, "Service is currently unavailable. Please try again later.");
                Logging.LogToFile($"Timestamp: {DateTime.Now} \n \t  Service is currently unavailable. Please try again later \n \t {ex.Message}");
                return StatusCode(503, ex.Message);
            }
            else
            {
                _logger?.LogError(ex, "Internal server error");
                Logging.LogToFile($"Timestamp: {DateTime.Now} \n \t  Internal server error \n \t {ex.Message}");
                return StatusCode(500, ex.Message);
            }
        }
    }
    
    [HttpPatch("Connection/{id}")]
    [Consumes("application/json")]
    [SwaggerResponse(StatusCodes.Status200OK, "The connection was updated", typeof(bool))]
    [SwaggerResponse(StatusCodes.Status400BadRequest, "Invalid request")]
    [SwaggerResponse(StatusCodes.Status500InternalServerError, "Internal server error")]
    [SwaggerResponse(StatusCodes.Status503ServiceUnavailable, "Service unavailable")]
    public async Task<IActionResult> Update(int id, [FromBody] ConnectionDTO _connectionDTO)
    {
        try
        {
            var connection = await _dbContext.Connections.FirstOrDefaultAsync(c => c.Id == id);

            if (connection != null)
            {
                _mapper.Map(_connectionDTO, connection);

                await _dbContext.SaveChangesAsync();
                
                _logger?.LogInformation("Connection updated");
                Logging.LogToFile($"Timestamp: {DateTime.Now} \n \t  Connection updated");
                return Ok(connection);
            }
            _logger?.LogInformation("Connection not found");
            Logging.LogToFile($"Timestamp: {DateTime.Now} \n \t  Connection not found");
            return NotFound("Connection not found");
        }
        catch (Exception ex)
        {
            if (ex is DbUpdateException)
            {
                _logger?.LogError(ex, "Invalid request");
                Logging.LogToFile($"Timestamp: {DateTime.Now} \n \t  Invalid request \n \t {ex.Message}");
                return StatusCode(400, ex.Message);
            }
            if (ex is DbUpdateConcurrencyException)
            {
                _logger?.LogError(ex, "Service is currently unavailable. Please try again later.");
                Logging.LogToFile($"Timestamp: {DateTime.Now} \n \t  Service is currently unavailable. Please try again later \n \t {ex.Message}");
                return StatusCode(503, ex.Message);
            }
            else
            {
                _logger?.LogError(ex, "Internal server error");
                Logging.LogToFile($"Timestamp: {DateTime.Now} \n \t  Internal server error \n \t {ex.Message}");
                return StatusCode(500, ex.Message);
            }
        }
    }

    [HttpPost("Connection")]
    [Consumes("application/json")]
    [SwaggerResponse(StatusCodes.Status201Created, "The connection was created", typeof(bool))]
    [SwaggerResponse(StatusCodes.Status400BadRequest, "Invalid request")]
    [SwaggerResponse(StatusCodes.Status500InternalServerError, "Internal server error")]
    [SwaggerResponse(StatusCodes.Status503ServiceUnavailable, "Service unavailable")]
    public async Task<IActionResult> Create([FromBody] ConnectionDTO _connectionDTO)
    {
        try
        {
            if (_connectionDTO == null)
            {
                _logger?.LogInformation("No data received");
                Logging.LogToFile($"Timestamp: {DateTime.Now} \n \t  No data received");
                return BadRequest("No data received");
            }

            // Controleren op duplicaten voor IdDriver
            if (_dbContext.Connections.Any(c => c.IdDriver == _connectionDTO.IdDriver))
            {
                _logger?.LogInformation("A connection with the same IdDriver already exists.");
                Logging.LogToFile($"Timestamp: {DateTime.Now} \n \t  A connection with the same IdDriver already exists.");
                return Conflict("A connection with the same IdDriver already exists.");
            }

            // Controleren op duplicaten voor IdGasCard
            if (_dbContext.Connections.Any(c => c.IdGasCard == _connectionDTO.IdGasCard))
            {
                _logger?.LogInformation("A connection with the same IdGasCard already exists.");
                Logging.LogToFile($"Timestamp: {DateTime.Now} \n \t  A connection with the same IdGasCard already exists.");
                return Conflict("A connection with the same IdGasCard already exists.");
            }

            // Controleren op duplicaten voor IdVehicle
            if (_dbContext.Connections.Any(c => c.IdVehicle == _connectionDTO.IdVehicle))
            {
                _logger?.LogInformation("A connection with the same IdVehicle already exists.");
                Logging.LogToFile($"Timestamp: {DateTime.Now} \n \t  A connection with the same IdVehicle already exists.");
                return Conflict("A connection with the same IdVehicle already exists.");
            }

            var newConnection = _mapper.Map<Connection>(_connectionDTO);

            _dbContext.Connections.Add(newConnection);
            await _dbContext.SaveChangesAsync();

            _logger?.LogInformation("Connection created");
            Logging.LogToFile($"Timestamp: {DateTime.Now} \n \t  Connection created");
            return Ok(newConnection);
        }
        catch (Exception ex)
        {
            if (ex is DbUpdateException)
            {
                _logger?.LogError(ex, "Invalid request");
                Logging.LogToFile($"Timestamp: {DateTime.Now} \n \t  Invalid request \n \t {ex.Message}");
                return StatusCode(400, ex.Message);
            }
            if (ex is DbUpdateConcurrencyException)
            {
                _logger?.LogError(ex, "Service is currently unavailable. Please try again later.");
                Logging.LogToFile($"Timestamp: {DateTime.Now} \n \t  Service is currently unavailable. Please try again later \n \t {ex.Message}");
                return StatusCode(503, ex.Message);
            }
            else
            {
                _logger?.LogError(ex, "Internal server error");
                Logging.LogToFile($"Timestamp: {DateTime.Now} \n \t  Internal server error \n \t {ex.Message}");
                return StatusCode(500, ex.Message);
            }
        }
    }
}