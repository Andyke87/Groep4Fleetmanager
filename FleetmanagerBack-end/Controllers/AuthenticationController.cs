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
            // Valideer gebruikersreferenties tegen je database of andere authenticatiemethode
            if (user.Email == "andy-lauwers@hotmail.com" && user.Password == "Lauwers01")
            {
                var issuer = _configuration["Jwt:Issuer"];
                var audience = _configuration["Jwt:Audience"];
                var key = Encoding.ASCII.GetBytes(_configuration["Jwt:PrivateKey"]);

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new[]
                    {
                    new Claim("Id", Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Name, user.Name),
                    new Claim(JwtRegisteredClaimNames.Email, user.Email),
                    
                    // Voeg andere claims toe zoals nodig
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

            _logger?.LogWarning("Ongeldige aanmeldingspoging");
            return Unauthorized();
        }
        catch (Exception ex)
        {
            _logger?.LogError(ex.ToString());
            return StatusCode(500, "Interne serverfout");
        }
    }


}