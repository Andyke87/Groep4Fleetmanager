using Microsoft.AspNetCore.Mvc;
using FleetManager.Models;
using Swashbuckle.AspNetCore.Annotations;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using FleetManager.Logging;

namespace Back_end.Controllers;

[ApiController]
[Route("[controller]")]
public class GasCardController : ControllerBase
{
    private readonly FleetManagerContext _dbContext;
    private readonly ILogger<GasCardController>? _logger;
    private readonly IMapper _mapper;

    public GasCardController(FleetManagerContext dBContext, ILogger<GasCardController>? logger, IMapper mapper)
    {
        _dbContext = dBContext;
        _logger = logger;
        _mapper = mapper;
    }

    [HttpGet("AllGasCards")]
    [Produces("application/json")]
    [SwaggerResponse(StatusCodes.Status200OK, "The list of all gas cards", typeof(IEnumerable<GasCard>))]
    [SwaggerResponse(StatusCodes.Status400BadRequest, "Invalid request")]
    [SwaggerResponse(StatusCodes.Status500InternalServerError, "Internal server error")]
    [SwaggerResponse(StatusCodes.Status503ServiceUnavailable, "Service unavailable")]
    public async Task<IActionResult> Get()
    {
        try
        {
            var gasCards = await _dbContext.GasCards.ToListAsync();
            var gasCardDTOs = _mapper.Map<List<GasCardDTO>>(gasCards);

            _logger?.LogInformation($"{gasCards.Count} gas cards where found");
            Logging.LogToFile($"Timestamp: {DateTime.Now} \n \t {gasCards.Count} gas cards where found");
            return Ok(gasCardDTOs);
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
                Logging.LogToFile($"Timestamp: {DateTime.Now} \n \t  Internal server error \n \t {ex.Message}");
                return StatusCode(500, ex.Message);
            }
        }
    }

    [HttpGet("GasCardById/{id}")]
    [Produces("application/json")]
    [SwaggerResponse(StatusCodes.Status200OK, "The gas card with the specified id", typeof(GasCard))]
    [SwaggerResponse(StatusCodes.Status400BadRequest, "Invalid request")]
    [SwaggerResponse(StatusCodes.Status500InternalServerError, "Internal server error")]
    [SwaggerResponse(StatusCodes.Status503ServiceUnavailable, "Service unavailable")]
    public async Task<IActionResult> GetByCode(int id)
    {
        try
        {
            var gasCard = await _dbContext.GasCards.FirstOrDefaultAsync(gc => gc.IdGasCard == id);

            if (gasCard == null)
            {
                _logger?.LogError("Gas card not found");
                Logging.LogToFile($"Timestamp: {DateTime.Now} \n \t Gas card not found");
                return NotFound("Gas card not found");
            }
            var gasCardDTO = _mapper.Map<GasCardDTO>(gasCard);
            
            _logger?.LogInformation("Returning gas card with id {id}", id);
            Logging.LogToFile($"Timestamp: {DateTime.Now} \n \t Returning gas card with id {id}");
            return Ok(gasCardDTO);
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

    [HttpDelete("GasCard/{id}")]
    [Produces("application/json")]
    [SwaggerResponse(StatusCodes.Status200OK, "The gas card has been removed", typeof(bool))]
    [SwaggerResponse(StatusCodes.Status400BadRequest, "Invalid request")]
    [SwaggerResponse(StatusCodes.Status500InternalServerError, "Internal server error")]
    [SwaggerResponse(StatusCodes.Status503ServiceUnavailable, "Service unavailable")]
    public async Task<IActionResult> Remove(int id)
    {
        try
        {
            var gasCard = await _dbContext.GasCards.FirstOrDefaultAsync(t => t.IdGasCard == id);

            if (gasCard == null)
            {
                _logger?.LogError("Gas card not found");
                Logging.LogToFile($"Timestamp: {DateTime.Now} \n \t Gas card not found");
                return NotFound("Gas card not found");
            }
            _dbContext.GasCards.Remove(gasCard);
            await _dbContext.SaveChangesAsync();
            var gasCardDTO = _mapper.Map<GasCardDTO>(gasCard);

            _logger?.LogInformation("Gas card removed");
            Logging.LogToFile($"Timestamp: {DateTime.Now} \n \t Gas card removed");
            return Ok(gasCardDTO);
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
            _logger?.LogError(ex, "Internal server error");
            Logging.LogToFile($"Timestamp: {DateTime.Now} \n \t Internal server error \n \t {ex.Message}");
            return StatusCode(500, ex.Message);
        }
    }

    [HttpPatch("GasCard/{id}")]
    [Consumes("application/json")]
    [SwaggerResponse(StatusCodes.Status200OK, "The gas card has been updated", typeof(bool))]
    [SwaggerResponse(StatusCodes.Status400BadRequest, "Invalid request")]
    [SwaggerResponse(StatusCodes.Status500InternalServerError, "Internal server error")]
    [SwaggerResponse(StatusCodes.Status503ServiceUnavailable, "Service unavailable")]
    public async Task<IActionResult> Update(int id, [FromBody] GasCardDTO _gasCardDTO)
    {
        try
        {
            var gasCard = await _dbContext.GasCards.FirstOrDefaultAsync(t => t.IdGasCard == id);
            if (gasCard == null)
            {
                _logger?.LogError("Gas card not found");
                return NotFound("Gas card not found");
            }
            _mapper.Map(_gasCardDTO, gasCard);
            await _dbContext.SaveChangesAsync();

            _logger?.LogInformation("Gas card updated");
            Logging.LogToFile($"Timestamp: {DateTime.Now} \n \t Gas card updated");
            return Ok("The gas card has been updated");
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

    [HttpPost("GasCard")]
    [Consumes("application/json")]
    [SwaggerResponse(StatusCodes.Status201Created, "The gas card has been created", typeof(bool))]
    [SwaggerResponse(StatusCodes.Status400BadRequest, "Invalid request")]
    [SwaggerResponse(StatusCodes.Status500InternalServerError, "Internal server error")]
    [SwaggerResponse(StatusCodes.Status503ServiceUnavailable, "Service unavailable")]
    public async Task<IActionResult> Create([FromBody] GasCardDTO _gasCardDTO)
    {
        try
        {
            if (_gasCardDTO == null)
            {
                _logger?.LogError("No data received");
                Logging.LogToFile($"Timestamp: {DateTime.Now} \n \t No data received");
                return BadRequest("No data received");
            }
            var gasCard = _mapper.Map<GasCard>(_gasCardDTO);
            _dbContext.GasCards.Add(gasCard);
            await _dbContext.SaveChangesAsync();

            _logger?.LogInformation("Gas card created");
            Logging.LogToFile($"Timestamp: {DateTime.Now} \n \t Gas card created");
            return Ok("The gas card has been created");
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
