using Microsoft.AspNetCore.Mvc;
using FleetManager.Models;
using Swashbuckle.AspNetCore.Annotations;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using FleetManager.Logging;

namespace Back_end.Controllers
{
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
            Console.WriteLine("Get method called");
            try
            {
                var drivers = await _dbContext.Drivers.ToListAsync();
                var driverDTOs = _mapper.Map<IEnumerable<DriverDTO>>(drivers);
                
                _logger?.LogInformation($"{drivers.Count} drivers were found");
                Logging.LogToFile($"Timestamp: {DateTime.Now}\n \t {drivers.Count} drivers were found");
                return Ok(driverDTOs);
            }
            catch (Exception ex)
            {
                if (ex is DbUpdateException)
                {
                    _logger?.LogError(ex, "Invalid request");
                    Logging.LogToFile($"Timestamp: {DateTime.Now}\n \t Invalid request \n \t {ex.Message}");
                    return StatusCode(400, ex.Message);
                }
                if (ex is DbUpdateConcurrencyException)
                {
                    _logger?.LogError(ex, "Service is currently unavailable. Please try again later.");
                    Logging.LogToFile($"Timestamp: {DateTime.Now}\n \t Service is currently unavailable. Please try again later \n \t {ex.Message}");
                    return StatusCode(503, ex.Message);
                }
                else
                {
                    _logger?.LogError(ex, "Internal server error");
                    Logging.LogToFile($"Timestamp: {DateTime.Now}\n \t Internal server error \n \t {ex.Message}");
                    return StatusCode(500, ex.Message);
                }
            }
        }

        [HttpGet("DriverById/{id}")]
        [Produces("application/json")]
        [SwaggerResponse(StatusCodes.Status200OK, "The driver with given id", typeof(Driver))]
        [SwaggerResponse(StatusCodes.Status400BadRequest, "Invalid request")]
        [SwaggerResponse(StatusCodes.Status500InternalServerError, "Internal server error")]
        [SwaggerResponse(StatusCodes.Status503ServiceUnavailable, "Service unavailable")]
        public async Task<IActionResult> GetByCode(int id)
        {
            try
            {
                var driver = await _dbContext.Drivers.FirstOrDefaultAsync(b => b.IdDriver == id);

                if (driver == null )
                {
                    _logger?.LogWarning("Driver not found");
                    Logging.LogToFile($"Timestamp: {DateTime.Now}\n \t Driver not found");
                    return NotFound("Driver not found");
                }

                var driverDTO = _mapper.Map<DriverDTO>(driver);

                _logger?.LogInformation($"Driver with id {id} was found");
                Logging.LogToFile($"Timestamp: {DateTime.Now}\n \t Driver with id {id} was found");
                return Ok(driverDTO);
            }
            catch (Exception ex)
            {
                if (ex is DbUpdateException)
                {
                    _logger?.LogError(ex, "Invalid request");
                    Logging.LogToFile($"Timestamp: {DateTime.Now}\n \t Invalid request \n \t {ex.Message}");
                    return StatusCode(400, ex.Message);
                }
                if (ex is DbUpdateConcurrencyException)
                {
                    _logger?.LogError(ex, "Service is currently unavailable. Please try again later.");
                    Logging.LogToFile($"Timestamp: {DateTime.Now}\n \t Service is currently unavailable. Please try again later \n \t {ex.Message}");
                    return StatusCode(503, ex.Message);
                }
                else
                {
                    _logger?.LogError(ex, "Internal server error");
                    Logging.LogToFile($"Timestamp: {DateTime.Now}\n \t Internal server error \n {ex.Message}");
                    return StatusCode(500, ex.Message);
                }
            }
        }

        [HttpDelete("Driver/{id}")]
        [Produces("application/json")]
        [SwaggerResponse(StatusCodes.Status200OK, "The driver is removed", typeof(bool))]
        [SwaggerResponse(StatusCodes.Status400BadRequest, "Invalid request")]
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
                    Logging.LogToFile($"Timestamp: {DateTime.Now}\n \t Driver not found");
                    return NotFound("Driver not found");
                }
                _dbContext.Drivers.Remove(driver);
                await _dbContext.SaveChangesAsync();
                var driverDTO = _mapper.Map<DriverDTO>(driver);

                _logger?.LogInformation($"Driver with id {id} was removed");
                Logging.LogToFile($"Timestamp: {DateTime.Now}\n \t Driver with id {id} was removed");
                return Ok(driverDTO);

            }
            catch (Exception ex)
            {
                if (ex is DbUpdateException)
                {
                    _logger?.LogError(ex, "Invalid request");
                    Logging.LogToFile($"Timestamp: {DateTime.Now}\n \t Invalid request \n \t {ex.Message}");
                    return StatusCode(400, ex.Message);
                }
                if (ex is DbUpdateConcurrencyException)
                {
                    _logger?.LogError(ex, "Service is currently unavailable. Please try again later.");
                    Logging.LogToFile($"Timestamp: {DateTime.Now}\n \t Service is currently unavailable. Please try again later \n \t {ex.Message}");
                    return StatusCode(503, ex.Message);
                }
                else
                {
                    _logger?.LogError(ex, "Internal server error");
                    Logging.LogToFile($"Timestamp: {DateTime.Now}\n \t Internal server error \n \t {ex.Message}");
                    return StatusCode(500, ex.Message);
                }
            }
        }

        [HttpPatch("Driver/{id}")]
        [Consumes("application/json")]
        [SwaggerResponse(StatusCodes.Status200OK, "The driver is updated", typeof(bool))]
        [SwaggerResponse(StatusCodes.Status400BadRequest, "Invalid request")]
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

                    _logger?.LogInformation($"Driver with id {id} was updated");
                    Logging.LogToFile($"Timestamp: {DateTime.Now}\n \t Driver with id {id} was updated");
                    return Ok(driver);
                }

                _logger?.LogWarning("Driver not found");
                Logging.LogToFile($"Timestamp: {DateTime.Now}\n \t Driver not found");
                return NotFound("Driver not found");
            }
            catch (Exception ex)
            {
                if (ex is DbUpdateException)
                {
                    _logger?.LogError(ex, "Invalid request");
                    Logging.LogToFile($"Timestamp: {DateTime.Now}\n \t Invalid request \n \t {ex.Message}");
                    return StatusCode(400, ex.Message);
                }
                if (ex is DbUpdateConcurrencyException)
                {
                    _logger?.LogError(ex, "Service is currently unavailable. Please try again later.");
                    Logging.LogToFile($"Timestamp: {DateTime.Now}\n \t Service is currently unavailable. Please try again later. \n \t {ex.Message}");
                    return StatusCode(503, ex.Message);
                }
                else
                {
                    _logger?.LogError(ex, "Internal server error");
                    Logging.LogToFile($"Timestamp: {DateTime.Now}\n \t Internal server error \n \t {ex.Message} \n \t {ex.Message}");
                    return StatusCode(500, ex.Message);
                }
            }
        }

        [HttpPost("Driver")]
        [Consumes("application/json")]
        [SwaggerResponse(StatusCodes.Status201Created, "The driver was created", typeof(bool))]
        [SwaggerResponse(StatusCodes.Status400BadRequest, "Invalid request")]
        [SwaggerResponse(StatusCodes.Status500InternalServerError, "Internal server error")]
        [SwaggerResponse(StatusCodes.Status503ServiceUnavailable, "Service unavailable")]
        public async Task<IActionResult> Create([FromBody] DriverDTO _driverDTO)
        {
            try
            {
                if (_driverDTO == null)
                {
                    _logger?.LogWarning("No data received");
                    Logging.LogToFile($"Timestamp: {DateTime.Now}\n \t No data received");
                    return BadRequest("No data received");
                }
                var driver = _mapper.Map<Driver>(_driverDTO);

                if (_dbContext.Drivers.Any(d => d.IdDriver == _driverDTO.IdDriver))
                {
                    _logger?.LogWarning("The driver id already exists");
                    Logging.LogToFile($"Timestamp: {DateTime.Now}\n \t The driver id already exists");
                    return BadRequest("The driver id already exists");
                }
                _dbContext.Drivers.Add(driver);
                await _dbContext.SaveChangesAsync();

                _logger?.LogInformation("The driver was created");
                Logging.LogToFile($"Timestamp: {DateTime.Now}\n \t The driver was created");            
                return Ok(driver);
            }
            catch (Exception ex)
            {
                if (ex is DbUpdateException)
                {
                    _logger?.LogError(ex, "Invalid request");
                    Logging.LogToFile($"Timestamp: {DateTime.Now}\n \t Invalid request \n \t {ex.Message}");
                    return StatusCode(400, ex.Message);
                }
                if (ex is DbUpdateConcurrencyException)
                {
                    _logger?.LogError(ex, "Service is currently unavailable. Please try again later");
                    Logging.LogToFile($"Timestamp: {DateTime.Now}\n \t Service is currently unavailable. Please try again later. \n \t {ex.Message}");
                    return StatusCode(503, ex.Message);
                }
                else
                {
                    _logger?.LogError(ex, "Internal server error");
                    Logging.LogToFile($"Timestamp: {DateTime.Now}\n \t Internal server error \n \t {ex.Message}");
                    return StatusCode(500, ex.Message);
                }
            }
        }
    }
}
