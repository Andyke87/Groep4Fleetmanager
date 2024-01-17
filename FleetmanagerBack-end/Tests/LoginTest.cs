using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Back_end.Controllers;
using FleetManager.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Moq;
using Xunit;

namespace Back_end.Tests.Controllers
{
    public class AuthenticationControllerTests
    {
        private readonly Mock<FleetManagerContext> _dbContextMock;
        private readonly Mock<ILogger<AuthenticationController>> _loggerMock;
        private readonly Mock<IConfiguration> _configurationMock;
        private readonly Mock<IMapper> _mapperMock;

        public AuthenticationControllerTests()
        {
            _dbContextMock = new Mock<FleetManagerContext>();
            _loggerMock = new Mock<ILogger<AuthenticationController>>();
            _configurationMock = new Mock<IConfiguration>();
            _mapperMock = new Mock<IMapper>();
        }

        [Fact]
        public async Task Login_ValidUser_ReturnsOk()
        {
            // Arrange
            var authenticationController = new AuthenticationController(
                _dbContextMock.Object,
                _loggerMock.Object,
                _configurationMock.Object,
                _mapperMock.Object
            );

            var existingUser = new Authentication { Email = "test@example.com", Password = BCrypt.Net.BCrypt.HashPassword("password") };
            _dbContextMock.Setup(db => db.Authentications.FirstOrDefaultAsync(It.IsAny<Func<Authentication, bool>>()))
                .ReturnsAsync(existingUser);

            // Act
            var result = await authenticationController.Login(new UserDto { Email = "test@example.com", Password = "password" });

            // Assert
            Assert.IsType<OkObjectResult>(result);
        }

        

        // Example: Test for GetAll method
        [Fact]
        public async Task GetAll_ReturnsOkWithUsers()
        {
            // Arrange
            var authenticationController = new AuthenticationController(
                _dbContextMock.Object,
                _loggerMock.Object,
                _configurationMock.Object,
                _mapperMock.Object
            );

            var users = new List<Authentication> { new Authentication(), new Authentication() };
            _dbContextMock.Setup(db => db.Authentications.ToListAsync()).ReturnsAsync(users);

            // Act
            var result = await authenticationController.GetAll();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var userDTOs = Assert.IsType<List<UserDto>>(okResult.Value);
            Assert.Equal(users.Count, userDTOs.Count);
        }

        


    }
}
