
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using AutoMapper;
using Xunit;
using FleetManager.Models;
using Back_end.Controllers;
using Microsoft.Extensions.Configuration;

public class UserControllerTests
{
    [Fact]
    public async Task GetByCode_ReturnsOkResult_WithValidId()
    {
        // Arrange
        int userId = 1;
        var dbContextMock = new Mock<FleetManagerContext>();
        var loggerMock = new Mock<ILogger<AuthenticationController>>();
        var mapperMock = new Mock<IMapper>();  // Make sure to add IMapper in the dependencies of AuthenticationController

        var configurationMock = new Mock<IConfiguration>();  // Import IConfiguration from Microsoft.Extensions.Configuration
        var controller = new AuthenticationController(dbContextMock.Object, loggerMock.Object, configurationMock.Object, mapperMock.Object);

        // Act
        var result = await controller.GetByCode(userId);

        // Assert
      
        Assert.IsTrue(result is OkResult);
    }
}
