using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Swashbuckle.AspNetCore.Annotations;
using FleetManager.Models;
using FleetManager.Logging;
using AutoMapper;

namespace Back_end.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthenticationController : ControllerBase
{
    private readonly FleetManagerContext _dbContext;
    private readonly ILogger<AuthenticationController>? _logger;
    private readonly IConfiguration _configuration;
    private readonly IMapper _mapper;

    public AuthenticationController(FleetManagerContext dbContext, ILogger<AuthenticationController>? logger, IConfiguration configuration, IMapper mapper)
    {
        _dbContext = dbContext;
        _logger = logger;
        _configuration = configuration;
        _mapper = mapper;
    }

    [HttpPost("Login")]
    [Produces("application/json")]
    [SwaggerResponse(StatusCodes.Status200OK, "User logged in successfully", typeof(UserDto))]
    [SwaggerResponse(StatusCodes.Status400BadRequest, "Invalid request")]
    [SwaggerResponse(StatusCodes.Status500InternalServerError, "Internal server error")]
    [SwaggerResponse(StatusCodes.Status503ServiceUnavailable, "Service unavailable")]
    public async Task<IActionResult> Login([FromBody] UserDto user)
    {
        try
        {
            var existingUser = await _dbContext.Authentications.FirstOrDefaultAsync(u => u.Email == user.Email);

            if (existingUser != null)
            {
                var isPasswordValid = BCrypt.Net.BCrypt.Verify(user.Password, existingUser.Password);

                _logger?.LogInformation("User was logged in");
                Logging.LogToFile($"Timestamp: {DateTime.Now} \n \t User was logged in");

                if (isPasswordValid)
                {
                    var issuer = _configuration["Jwt:Issuer"];
                    var audience = _configuration["Jwt:Audience"];
                    var privateKey = _configuration["Jwt:PrivateKey"];
                    var key = !string.IsNullOrEmpty(privateKey) ? Convert.FromBase64String(privateKey) : null;

                    var tokenDescriptor = new SecurityTokenDescriptor
                    {
                        Subject = new ClaimsIdentity(new[]
                        {
                        new Claim("Id", existingUser.Id.ToString()),
                        new Claim(JwtRegisteredClaimNames.Name, existingUser.Name),
                        new Claim(JwtRegisteredClaimNames.Email, existingUser.Email),
                        new Claim(ClaimTypes.Role, existingUser.Role),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
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
            }

            _logger?.LogWarning("Invalid login attempt. Email: {Email}", user.Email);
            Logging.LogToFile($"Timestamp: {DateTime.Now} \n \t  Invalid login attempt. Email: {user.Email}");
            return Unauthorized("Invalid login attempt");
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
                Logging.LogToFile($"Timestamp: {DateTime.Now} \n \t Internal server error \n \t {ex.Message}");
                return StatusCode(500, ex.Message);
            }
        }
    }

    [HttpGet("AllUsers")]
    [Produces("application/json")]
    [SwaggerResponse(StatusCodes.Status200OK, "All users", typeof(IEnumerable<UserDto>))]
    [SwaggerResponse(StatusCodes.Status400BadRequest, "Invalid request")]
    [SwaggerResponse(StatusCodes.Status404NotFound, "No users found")]
    [SwaggerResponse(StatusCodes.Status500InternalServerError, "Internal server error")]
    [SwaggerResponse(StatusCodes.Status503ServiceUnavailable, "Service unavailable")]
    public async Task<IActionResult> GetAll()
    {
        try
        {
            var users = await _dbContext.Authentications.ToListAsync();
            if (users == null)
            {
                _logger?.LogWarning("No users found");
                Logging.LogToFile($"Timestamp: {DateTime.Now} \n \t  No users found");
                return NotFound("No users found");
            }
            var userDTOs = _mapper.Map<IEnumerable<UserDto>>(users);

            _logger?.LogInformation($"{users.Count} users where found");
            Logging.LogToFile($"Timestamp: {DateTime.Now} \n \t  {users.Count} users where found");
            return Ok(userDTOs);
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

    [HttpGet("UserById/{id}")]
    [Produces("application/json")]
    [SwaggerResponse(StatusCodes.Status200OK, "The user with given id", typeof(UserDto))]
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
                Logging.LogToFile($"Timestamp: {DateTime.Now} \n \t  Unauthorized access");
                return Unauthorized();
            }
            else
            {
                var user = await _dbContext.Authentications.FirstOrDefaultAsync(b => b.Id == id);

                _logger?.LogInformation("Authorized access");
                Logging.LogToFile($"Timestamp: {DateTime.Now} \n \t  Authorized access");
                
                if (user == null)
                {
                    _logger?.LogWarning("User not found");
                    Logging.LogToFile($"Timestamp: {DateTime.Now} \n \t  User not found");
                    return NotFound("User not found");
                }
                var userDTO = _mapper.Map<UserDto>(user);

                _logger?.LogInformation($"User with id {id} was found");
                Logging.LogToFile($"Timestamp: {DateTime.Now} \n \t  User with id {id} was found");
                return Ok(userDTO);
            }
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

    [HttpPost("User")]
    [Consumes("application/json")]
    [SwaggerResponse(StatusCodes.Status201Created, "User created successfully", typeof(UserDto))]
    [SwaggerResponse(StatusCodes.Status400BadRequest, "Invalid request")]
    [SwaggerResponse(StatusCodes.Status503ServiceUnavailable, "Service unavailable")]
    public async Task<IActionResult> Create([FromBody] UserDto userDto)
    {
        try
        {
            var userEntity = _mapper.Map<User>(userDto);
            userEntity.Name = userDto.Name!; 
            userEntity.Email = userDto.Email;

            var saltRounds = 15;
            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(userDto.Password, saltRounds);

            userEntity.Password = hashedPassword;
            userEntity.Role = userDto.Role!;

            await _dbContext.Authentications.AddAsync(userEntity);
            await _dbContext.SaveChangesAsync();

            var createdUserDto = _mapper.Map<UserDto>(userEntity);

            _logger?.LogInformation($"User {createdUserDto.FirstName} {createdUserDto.Name} was created");
            Logging.LogToFile($"Timestamp: {DateTime.Now} \n \t  User {createdUserDto.FirstName} {createdUserDto.Name} was created");
            return CreatedAtAction(nameof(GetByCode), new { id = createdUserDto.Id }, createdUserDto);
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

    [HttpPatch("User/{id}")]
    [Consumes("application/json")]
    [SwaggerResponse(StatusCodes.Status200OK, "User updated successfully", typeof(UserDto))]
    [SwaggerResponse(StatusCodes.Status400BadRequest, "Invalid request")]
    [SwaggerResponse(StatusCodes.Status404NotFound, "User not found")]
    [SwaggerResponse(StatusCodes.Status503ServiceUnavailable, "Service unavailable")]
    public async Task<IActionResult> Update(int id, [FromBody] UserDto user)
    {
        try
        {
            var userEntity = await _dbContext.Authentications.FirstOrDefaultAsync(b => b.Id == id);
            if (userEntity == null)
            {
                _logger?.LogWarning("User not found");
                Logging.LogToFile($"Timestamp: {DateTime.Now} \n \t  User not found");
                return NotFound("User not found");
            }
            userEntity.Name = user.Name!;
            userEntity.FirstName = user.FirstName!;
            userEntity.Email = user.Email;
            var saltRounds = 15;
            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(user.Password, saltRounds);
            userEntity.Password = hashedPassword;
            userEntity.Role = user.Role!;

            await _dbContext.SaveChangesAsync();
            var userDTO = _mapper.Map<UserDto>(userEntity);

            _logger?.LogInformation($"User with id {id} was updated");
            Logging.LogToFile($"Timestamp: {DateTime.Now} \n \t User with id {id} was updated");
            return Ok(userDTO);

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
                Logging.LogToFile($"Timestamp: {DateTime.Now} \n \t Internal server error \n \t {ex.Message}");
                return StatusCode(500, ex.Message);
            }
        }
    }

    [HttpDelete("User/{id}")]
    [Produces("application/json")]
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
                Logging.LogToFile($"Timestamp: {DateTime.Now} \n \t  User not found");
                return NotFound("User not found");
            }
            _dbContext.Authentications.Remove(user);
            await _dbContext.SaveChangesAsync();
            var userDTO = _mapper.Map<UserDto>(user);

            _logger?.LogInformation($"User with id {id} was removed");
            Logging.LogToFile($"Timestamp: {DateTime.Now} \n \t  User with id {id} was removed");
            return Ok(userDTO);

        }
        catch (Exception ex)
        {
            if (ex is DbUpdateException)
            {
                _logger?.LogError(ex, "Invalid request");
                Logging.LogToFile($"Timestamp: {DateTime.Now} \n \t  Invalid request \n \t {ex.Message}");
                return StatusCode(400, "Invalid request");
            }
            if (ex is DbUpdateConcurrencyException)
            {
                _logger?.LogError(ex, "Service is currently unavailable. Please try again later.");
                Logging.LogToFile($"Timestamp: {DateTime.Now} \n \t  Service is currently unavailable. Please try again later \n \t {ex.Message}");
                return StatusCode(503, "Service is currently unavailable. Please try again later.");
            }
            else
            {
                _logger?.LogError(ex, "Internal server error");
                Logging.LogToFile($"Timestamp: {DateTime.Now} \n \t  Internal server error \n \t {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
