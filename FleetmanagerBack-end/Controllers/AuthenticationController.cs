using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Swashbuckle.AspNetCore.Annotations;
using FleetManager.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;

namespace Back_end.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthenticationController : ControllerBase
{
    private readonly FleetManagerContext _dbContext;
    private readonly ILogger<AuthenticationController>? _logger;
    private readonly IConfiguration _configuration;
    private readonly IMapper _mapper;
    List<Authentication> users = new();

    public AuthenticationController(FleetManagerContext dbContext, ILogger<AuthenticationController>? logger, IConfiguration configuration, IMapper mapper)
    {
        _dbContext = dbContext;
        _logger = logger;
        _configuration = configuration;
        _mapper = mapper;
    }
    [HttpPost("CreateToken")]
    [SwaggerResponse(StatusCodes.Status200OK, "Token created successfully", typeof(string))]
    [SwaggerResponse(StatusCodes.Status401Unauthorized, "Invalid login attempt")]
    [SwaggerResponse(StatusCodes.Status400BadRequest, "Invalid request")]
    [SwaggerResponse(StatusCodes.Status503ServiceUnavailable, "Service unavailable")]
    public async Task<IActionResult> CreateToken([FromBody] AuthenticationDTO user)
    {
        users = await _dbContext.Authentications.ToListAsync();
        try
        {
            if (users.Any(u => u.Email == user.Email && u.Password == user.Password))
            {
                var issuer = _configuration["Jwt:Issuer"];
                var audience = _configuration["Jwt:Audience"];
                var key = Convert.FromBase64String(_configuration["Jwt:PrivateKey"]);

                _logger?.LogInformation("Aanmelding succesvol. E-mail: {Email}", user.Email);

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new[]
                    {
                        new Claim("Id", Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Name, user.Name),
                        new Claim(JwtRegisteredClaimNames.Email, user.Email),
                        new Claim(ClaimTypes.Role, "Admin")
                    }),
                    Expires = DateTime.UtcNow.AddMinutes(15),
                    Issuer = issuer,
                    Audience = audience,
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha512Signature)
                };

                var tokenHandler = new JwtSecurityTokenHandler();
                var token = tokenHandler.CreateToken(tokenDescriptor);
                var jwtToken = tokenHandler.WriteToken(token);

                return Ok(jwtToken);
            }

            _logger?.LogWarning("Ongeldige aanmeldpoging. E-mail: {Email}", user.Email);
            return Unauthorized();
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

    [HttpGet("AllUsers")]
    [Authorize (Roles = "Admin")]
    [SwaggerResponse(StatusCodes.Status200OK, "All users", typeof(IEnumerable<AuthenticationDTO>))]
    [SwaggerResponse(StatusCodes.Status400BadRequest, "Invalid request")]
    [SwaggerResponse(StatusCodes.Status404NotFound, "No users found")]
    [SwaggerResponse(StatusCodes.Status500InternalServerError, "Internal server error")]
    [SwaggerResponse(StatusCodes.Status503ServiceUnavailable, "Service unavailable")]
    public async Task<IActionResult> GetAll()
    {
        try
        {
            if (!User.IsInRole("Admin"))
            {
                _logger?.LogWarning("Unauthorized access");
                return Unauthorized();
            }
            else
            {
                _logger?.LogInformation("Authorized access");
                var users = await _dbContext.Authentications.ToListAsync();

                if (users == null)
                {
                    _logger?.LogWarning("No users found");
                    return NotFound("No users found");
                }

                var userDTOs = _mapper.Map<IEnumerable<AuthenticationDTO>>(users);
                _logger?.LogInformation($"{users.Count} users where found");
                return Ok(userDTOs);
            }
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

    [HttpGet("UserById/{id}")]
    [Authorize (Roles = "Admin")]
    [SwaggerResponse(StatusCodes.Status200OK, "The user with given id", typeof(AuthenticationDTO))]
    [SwaggerResponse(StatusCodes.Status400BadRequest, "Invalid request")]
    [SwaggerResponse(StatusCodes.Status404NotFound, "User not found")]
    [SwaggerResponse(StatusCodes.Status500InternalServerError, "Internal server error")]
    [SwaggerResponse(StatusCodes.Status503ServiceUnavailable, "Service unavailable")]
    public async Task<IActionResult> GetByCode(int id)
    {
        try
        {
            if (!User.IsInRole("Admin"))
            {
                _logger?.LogWarning("Unauthorized access");
                return Unauthorized();
            }
            else
            {
                var user = await _dbContext.Authentications.FirstOrDefaultAsync(b => b.Id == id);

                _logger?.LogInformation("Authorized access");
            if (user == null)
            {
                _logger?.LogWarning("User not found");
                return NotFound("User not found");
            }

            var userDTO = _mapper.Map<AuthenticationDTO>(user);
            _logger?.LogInformation($"User with id {id} was found");
            return Ok(userDTO);
            }
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

    [HttpPost("CreateUser")]
    [Authorize (Roles = "Admin")]
    [SwaggerResponse(StatusCodes.Status201Created, "User created successfully", typeof(AuthenticationDTO))]
    [SwaggerResponse(StatusCodes.Status400BadRequest, "Invalid request")]
    [SwaggerResponse(StatusCodes.Status503ServiceUnavailable, "Service unavailable")]
    public async Task<IActionResult> Create([FromBody] AuthenticationDTO user)
    {
        try
        {
            var userEntity = _mapper.Map<Authentication>(user);

            userEntity.Role = user.Role;

            await _dbContext.Authentications.AddAsync(userEntity);
            await _dbContext.SaveChangesAsync();

            var userDTO = _mapper.Map<AuthenticationDTO>(userEntity);
            _logger?.LogInformation($"User with id {user.Id} was created");
            return CreatedAtAction(nameof(GetByCode), new { id = user.Id }, userDTO);
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

    [HttpPatch("UpdateUser/{id}")]
    [Authorize (Roles = "Admin")]
    [SwaggerResponse(StatusCodes.Status200OK, "User updated successfully", typeof(AuthenticationDTO))]
    [SwaggerResponse(StatusCodes.Status400BadRequest, "Invalid request")]
    [SwaggerResponse(StatusCodes.Status404NotFound, "User not found")]
    [SwaggerResponse(StatusCodes.Status503ServiceUnavailable, "Service unavailable")]
    public async Task<IActionResult> Update(int id, [FromBody] AuthenticationDTO user)
    {
        try
        {
            var userEntity = await _dbContext.Authentications.FirstOrDefaultAsync(b => b.Id == id);

            if (userEntity == null)
            {
                _logger?.LogWarning("User not found");
                return NotFound("User not found");
            }

            _mapper.Map(user, userEntity);

            await _dbContext.SaveChangesAsync();

            var userDTO = _mapper.Map<AuthenticationDTO>(userEntity);
            _logger?.LogInformation($"User with id {id} was updated");
            return Ok(userDTO);
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

    [HttpDelete("DeleteUser/{id}")]
    [Authorize(Roles = "Admin")]
    [SwaggerResponse(StatusCodes.Status200OK, "User deleted successfully", typeof(bool))]
    [SwaggerResponse(StatusCodes.Status400BadRequest, "Invalid request")]
    [SwaggerResponse(StatusCodes.Status404NotFound, "User not found")]
    [SwaggerResponse(StatusCodes.Status500InternalServerError, "Internal server error")]
    [SwaggerResponse(StatusCodes.Status503ServiceUnavailable, "Service unavailable")]
    public async Task<IActionResult> Remove(int id)
    {
        try
        {
            var user = await _dbContext.Authentications.FirstOrDefaultAsync(b => b.Id == id);

            if (user == null)
            {
                _logger?.LogWarning("User not found");
                return NotFound("User not found");
            }
            _dbContext.Authentications.Remove(user);
            await _dbContext.SaveChangesAsync();

            var userDTO = _mapper.Map<AuthenticationDTO>(user);
            _logger?.LogInformation($"User with id {id} was removed");
            return Ok(userDTO);

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
