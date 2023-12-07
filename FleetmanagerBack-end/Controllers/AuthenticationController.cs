using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Swashbuckle.AspNetCore.Annotations;
using FleetManager.Models;

namespace Back_end.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthenticationController: ControllerBase
{
    private readonly FleetManagerContext _dbContext;
    private readonly ILogger<AuthenticationController>? _logger;
    private readonly IConfiguration _configuration;
    
    public AuthenticationController(FleetManagerContext dbContext, ILogger<AuthenticationController>? logger, IConfiguration configuration)
    {  
    _dbContext = dbContext; 
    _logger = logger;
    _configuration = configuration;

    }
    [HttpPost("CreateToken")]
    [Consumes("application/json")]
    [SwaggerResponse(StatusCodes.Status200OK, "Token created successfully", typeof(string))]
    [SwaggerResponse(StatusCodes.Status401Unauthorized, "Invalid login attempt")]
    [SwaggerResponse(StatusCodes.Status400BadRequest, "Invalid request")]
    [SwaggerResponse(StatusCodes.Status503ServiceUnavailable, "Service unavailable")]
    public async Task<IActionResult> CreateToken([FromBody] AuthenticationDTO user)
    {
        try
        {
            // Validate user credentials against your database or other authentication method
            if (user.Email == "test@test.com" && user.Password == "test")
            {
                var issuer = _configuration["Jwt:Issuer"];
                var audience = _configuration["Jwt:Audience"];
                var key = Convert.FromBase64String(_configuration["Jwt:PrivateKey"]);

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new[]
                    {
                    new Claim("Id", Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Name, user.Name),
                    new Claim(JwtRegisteredClaimNames.Email, user.Email),
                }),
                    Expires = DateTime.UtcNow.AddMinutes(5),
                    Issuer = issuer,
                    Audience = audience,
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha512Signature)
                };

                var tokenHandler = new JwtSecurityTokenHandler();
                var token = tokenHandler.CreateToken(tokenDescriptor);
                var jwtToken = tokenHandler.WriteToken(token);

                return Ok(jwtToken);
            }

            _logger?.LogWarning("Invalid login attempt");
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
}
