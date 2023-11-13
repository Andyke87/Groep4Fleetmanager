using Microsoft.AspNetCore.Mvc;
using FleetManager.Models;
using Swashbuckle.AspNetCore.Annotations;
namespace Back_end.Controllers;

[ApiController]
[Route("[controller]")]
public class TankkaartController : ControllerBase
{
    private readonly FleetManagerContext _DbContext;

    public TankkaartController(FleetManagerContext dBContext)
    {
        this._DbContext = dBContext;
    }

    [HttpGet("AlleTankkaarten")]
    [SwaggerResponse(StatusCodes.Status200OK, "De lijst van alle tankkaarten", typeof(IEnumerable<Tankkaart>))]
    [SwaggerResponse(StatusCodes.Status400BadRequest)]
    [SwaggerResponse(StatusCodes.Status409Conflict)]
    [SwaggerResponse(StatusCodes.Status500InternalServerError)]
    [SwaggerResponse(StatusCodes.Status503ServiceUnavailable)]
    public IActionResult Get()
    {
        var tankkaart = _DbContext.Tankkaarten.ToList();
        return Ok(tankkaart);
    }
    [HttpGet("TankkaartBijCode/{code}")]
    [SwaggerResponse(StatusCodes.Status200OK, "De tankkaart met de opgegeven code", typeof(Tankkaart))]
    [SwaggerResponse(StatusCodes.Status400BadRequest)]
    [SwaggerResponse(StatusCodes.Status409Conflict)]
    [SwaggerResponse(StatusCodes.Status500InternalServerError)]
    [SwaggerResponse(StatusCodes.Status503ServiceUnavailable)]
    public IActionResult GetByCode(int code)
    {
        var tankkaart = _DbContext.Tankkaarten.FirstOrDefault(gc => gc.IdTankkaart == code);
        return Ok(tankkaart);
    }
    [HttpDelete("Tankkaart/{code}")]
    [SwaggerResponse(StatusCodes.Status200OK, "De tankkaart met de opgegeven code werd verwijderd", typeof(bool))]
    [SwaggerResponse(StatusCodes.Status400BadRequest)]
    [SwaggerResponse(StatusCodes.Status409Conflict)]
    [SwaggerResponse(StatusCodes.Status500InternalServerError)]
    [SwaggerResponse(StatusCodes.Status503ServiceUnavailable)]
    public IActionResult Remove(int code)
    {
        var tankkaart = _DbContext.Tankkaarten.FirstOrDefault(t => t.IdTankkaart == code);
        if (tankkaart != null)
        {
            _DbContext.Remove(tankkaart);
            _DbContext.SaveChanges();
            return Ok(true);
        }
        return Ok(false);
    }
    [HttpPost("Tankkaart")]
    [SwaggerResponse(StatusCodes.Status201Created, "De tankkaart werd aangemaakt", typeof(bool))]
    [SwaggerResponse(StatusCodes.Status400BadRequest)]
    [SwaggerResponse(StatusCodes.Status409Conflict)]
    [SwaggerResponse(StatusCodes.Status500InternalServerError)]
    [SwaggerResponse(StatusCodes.Status503ServiceUnavailable)]
    public IActionResult Create([FromBody] Tankkaart _tankkaart)
    {
        var tankkaart = _DbContext.Tankkaarten.FirstOrDefault(t => t.IdTankkaart == _tankkaart.IdTankkaart);

            _DbContext.Tankkaarten.Add(_tankkaart);
            _DbContext.SaveChanges();
        
        return Ok(true);
    }
}