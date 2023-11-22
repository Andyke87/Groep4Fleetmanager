using Microsoft.AspNetCore.Mvc;
using FleetManager.Models;
using Swashbuckle.AspNetCore.Annotations;
using Microsoft.EntityFrameworkCore;
namespace Back_end.Controllers;

[ApiController]
[Route("[controller]")]
public class GasCardController : ControllerBase
{
    private readonly FleetManagerContext _dbContext;

    public GasCardController(FleetManagerContext dBContext)
    {
        _dbContext = dBContext;
    }

    [HttpGet("AllGasCards")]
    [SwaggerResponse(StatusCodes.Status200OK, "The list of all gas cards", typeof(IEnumerable<GasCard>))]
    [SwaggerResponse(StatusCodes.Status400BadRequest, "Invalid request")]
    [SwaggerResponse(StatusCodes.Status409Conflict, "Conflict in data")]
    [SwaggerResponse(StatusCodes.Status500InternalServerError, "Internal server error")]
    [SwaggerResponse(StatusCodes.Status503ServiceUnavailable, "Service unavailable")]
    public async Task<IActionResult> Get()
    {
        try
        {
            var gasCards = await _dbContext.GasCards.ToListAsync();
            return Ok(gasCards);
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

    [HttpGet("GasCardById/{id}")]
    [SwaggerResponse(StatusCodes.Status200OK, "The gas card with the specified id", typeof(GasCard))]
    [SwaggerResponse(StatusCodes.Status400BadRequest, "Invalid request")]
    [SwaggerResponse(StatusCodes.Status409Conflict, "Conflict in data")]
    [SwaggerResponse(StatusCodes.Status500InternalServerError, "Internal server error")]
    [SwaggerResponse(StatusCodes.Status503ServiceUnavailable, "Service unavailable")]
    public async Task<IActionResult> GetByCode(int id)
    {
        try
        {
            var gasCard = await _dbContext.GasCards.FirstOrDefaultAsync(gc => gc.IdGasCard == id);

            if (gasCard == null)
            {
                return NotFound("Gas card not found");
            }

            return Ok(gasCard);
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
    [HttpDelete("GasCard/{id}")]
    [SwaggerResponse(StatusCodes.Status200OK, "The gas card has been removed", typeof(bool))]
    [SwaggerResponse(StatusCodes.Status400BadRequest, "Invalid request")]
    [SwaggerResponse(StatusCodes.Status409Conflict, "Conflict in data")]
    [SwaggerResponse(StatusCodes.Status500InternalServerError, "Internal server error")]
    [SwaggerResponse(StatusCodes.Status503ServiceUnavailable, "Service unavailable")]
    public async Task<IActionResult> Remove(int id)
    {
        try
        {
            var gasCard = await _dbContext.GasCards.FirstOrDefaultAsync(t => t.IdGasCard == id);

            if (gasCard == null)
            {
                return NotFound("Gas card not found");
            }

            _dbContext.GasCards.Remove(gasCard);
            await _dbContext.SaveChangesAsync();

            return Ok("The gas card has been removed");
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

    [HttpPatch("GasCard/{id}")]
    [SwaggerResponse(StatusCodes.Status200OK, "The gas card has been updated", typeof(bool))]
    [SwaggerResponse(StatusCodes.Status400BadRequest, "Invalid request")]
    [SwaggerResponse(StatusCodes.Status404NotFound, "Gas card not found")]
    [SwaggerResponse(StatusCodes.Status409Conflict, "Conflict in data")]
    [SwaggerResponse(StatusCodes.Status500InternalServerError, "Internal server error")]
    [SwaggerResponse(StatusCodes.Status503ServiceUnavailable, "Service unavailable")]
    public async Task<IActionResult> Update(int id, [FromBody] GasCard _gasCard)
    {
        try
        {
            var gasCard = await _dbContext.GasCards.FirstOrDefaultAsync(t => t.IdGasCard == id);

            if (gasCard == null)
            {
                return NotFound("Gas card not found");
            }

            gasCard.CardNumber = _gasCard.CardNumber;
            gasCard.ValidationDate = _gasCard.ValidationDate;
            gasCard.Pin = _gasCard.Pin;
            gasCard.Fuel = _gasCard.Fuel;
            gasCard.Blocked = _gasCard.Blocked;

            await _dbContext.SaveChangesAsync();

            return Ok("The gas card has been updated");
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

    [HttpPost("GasCard")]
    [SwaggerResponse(StatusCodes.Status201Created, "The gas card has been created", typeof(bool))]
    [SwaggerResponse(StatusCodes.Status400BadRequest, "Invalid request")]
    [SwaggerResponse(StatusCodes.Status409Conflict, "Conflict in data")]
    [SwaggerResponse(StatusCodes.Status500InternalServerError, "Internal server error")]
    [SwaggerResponse(StatusCodes.Status503ServiceUnavailable, "Service unavailable")]
    public async Task<IActionResult> Create([FromBody] GasCard _gasCard)
    {
        try
        {
            // Controleer of de gaskaartgegevens geldig zijn
            if (_gasCard == null)
            {
                return BadRequest("No data received");
            }

            // Voeg de gaskaart toe aan de database
            _dbContext.GasCards.Add(_gasCard);
            await _dbContext.SaveChangesAsync();

            // Retourneer een succesrespons
            return Ok("The gas card has been created");
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
