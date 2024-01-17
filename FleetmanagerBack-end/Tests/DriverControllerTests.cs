using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Back_end.Controllers;
using FleetManager.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Moq;
using Xunit;

namespace Back_end.Tests.Controllers
{
    public class DriverControllerTests
    {
        private readonly Mock<FleetManagerContext> _dbContextMock;
        private readonly Mock<ILogger<DriverController>> _loggerMock;
        private readonly Mock<IMapper> _mapperMock;

        public DriverControllerTests()
        {
            _dbContextMock = new Mock<FleetManagerContext>();
            _loggerMock = new Mock<ILogger<DriverController>>();
            _mapperMock = new Mock<IMapper>();
        }


        [Fact]
        public async Task GetByCode_ValidId_ReturnsOkWithDriverDto()
        {
            var driverController = new DriverController(
                _dbContextMock.Object,
                _loggerMock.Object,
                _mapperMock.Object
            );

            var driverId = 1;
            var driver = new Driver { IdDriver = driverId, Name = "John Doe" };
            _dbContextMock.Setup(db => db.Drivers.FirstOrDefaultAsync(It.IsAny<Func<Driver, bool>>()))
                .ReturnsAsync(driver);

            var result = await driverController.GetByCode(driverId);

            Assert.IsType<OkObjectResult>(result);
            var okResult = (OkObjectResult)result;
            Assert.IsType<DriverDTO>(okResult.Value);
        }

        [Fact]
        public async Task Remove_ValidId_ReturnsOkWithDriverDto()
        {
            var driverController = new DriverController(
                _dbContextMock.Object,
                _loggerMock.Object,
                _mapperMock.Object
            );

            var driverId = 1;
            var driver = new Driver { IdDriver = driverId, Name = "John Doe" };
            _dbContextMock.Setup(db => db.Drivers.FirstOrDefaultAsync(It.IsAny<Func<Driver, bool>>()))
                .ReturnsAsync(driver);

            var result = await driverController.Remove(driverId);

            Assert.IsType<OkObjectResult>(result);
            var okResult = (OkObjectResult)result;
            Assert.IsType<DriverDTO>(okResult.Value);
        }

        [Fact]
        public async Task Update_ValidIdAndDriverDto_ReturnsOkWithDriverDto()
        {
            var driverController = new DriverController(
                _dbContextMock.Object,
                _loggerMock.Object,
                _mapperMock.Object
            );

            var driverId = 1;
            var updatedDriverDto = new DriverDTO { IdDriver = driverId, Name = "Updated Driver" };
            var existingDriver = new Driver { IdDriver = driverId, Name = "John Doe" };
            _dbContextMock.Setup(db => db.Drivers.FirstOrDefaultAsync(It.IsAny<Func<Driver, bool>>()))
                .ReturnsAsync(existingDriver);

            var result = await driverController.Update(driverId, updatedDriverDto);

            Assert.IsType<OkObjectResult>(result);
            var okResult = (OkObjectResult)result;
            Assert.IsType<DriverDTO>(okResult.Value);
        }
    }
}
