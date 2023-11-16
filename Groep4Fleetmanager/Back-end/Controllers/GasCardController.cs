using Microsoft.AspNetCore.Mvc;
using FleetManager.Models;
using Swashbuckle.AspNetCore.Annotations;
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
    [SwaggerResponse(StatusCodes.Status400BadRequest)]
    [SwaggerResponse(StatusCodes.Status409Conflict)]
    [SwaggerResponse(StatusCodes.Status500InternalServerError)]
    [SwaggerResponse(StatusCodes.Status503ServiceUnavailable)]
    public IActionResult Get()
    {
        var gasCard = _dbContext.GasCards.ToList();
        return Ok(gasCard);
    }
    [HttpGet("GasCardByCode/{code}")]
    [SwaggerResponse(StatusCodes.Status200OK, "The gas card with given code", typeof(GasCard))]
    [SwaggerResponse(StatusCodes.Status400BadRequest)]
    [SwaggerResponse(StatusCodes.Status409Conflict)]
    [SwaggerResponse(StatusCodes.Status500InternalServerError)]
    [SwaggerResponse(StatusCodes.Status503ServiceUnavailable)]
    public IActionResult GetByCode(int code)
    {
        var gasCard = _dbContext.GasCards.FirstOrDefault(gc => gc.IdGasCard == code);
        return Ok(gasCard);
    }
    [HttpDelete("GasCard/{code}")]
    [SwaggerResponse(StatusCodes.Status200OK, "The gas card is removed", typeof(bool))]
    [SwaggerResponse(StatusCodes.Status400BadRequest)]
    [SwaggerResponse(StatusCodes.Status409Conflict)]
    [SwaggerResponse(StatusCodes.Status500InternalServerError)]
    [SwaggerResponse(StatusCodes.Status503ServiceUnavailable)]
    public IActionResult Remove(int code)
    {
        var gasCard = _dbContext.GasCards.FirstOrDefault(t => t.IdGasCard == code);
        if (gasCard != null)
        {
            _dbContext.Remove(gasCard);
            _dbContext.SaveChanges();
            return Ok(true);
        }
        return Ok(false);
    }
    [HttpPost("GasCard")]
    [SwaggerResponse(StatusCodes.Status201Created, "The gas card was created", typeof(bool))]
    [SwaggerResponse(StatusCodes.Status400BadRequest)]
    [SwaggerResponse(StatusCodes.Status409Conflict)]
    [SwaggerResponse(StatusCodes.Status500InternalServerError)]
    [SwaggerResponse(StatusCodes.Status503ServiceUnavailable)]
    public IActionResult Create([FromBody] GasCard _gasCard)
    {
        _dbContext.GasCards.FirstOrDefault(t => t.IdGasCard == _gasCard.IdGasCard);

        _dbContext.GasCards.Add(_gasCard);
        _dbContext.SaveChanges();

        return Ok(true);
    }
}