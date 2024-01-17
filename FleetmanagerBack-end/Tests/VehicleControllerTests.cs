using System;
using System.Collections.Generic;
using System.Linq;
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
    public class VehicleControllerTests
    {
        private readonly Mock<FleetManagerContext> _dbContextMock;
        private readonly Mock<ILogger<VehicleController>> _loggerMock;
        private readonly Mock<IMapper> _mapperMock;

        public VehicleControllerTests()
        {
            _dbContextMock = new Mock<FleetManagerContext>();
            _loggerMock = new Mock<ILogger<VehicleController>>();
            _mapperMock = new Mock<IMapper>();
        }


        [Fact]
        public async Task GetByCode_ValidId_ReturnsOkWithVehicleDto()
        {
            var vehicleController = new VehicleController(
                _dbContextMock.Object,
                _loggerMock.Object,
                _mapperMock.Object
            );

            var vehicleId = 1;
            var vehicle = new Vehicle { IdVehicle = vehicleId, Brand = "Toyota" };
            _dbContextMock.Setup(db => db.Vehicles.FirstOrDefaultAsync(It.IsAny<Func<Vehicle, bool>>()))
                .ReturnsAsync(vehicle);

            var result = await vehicleController.GetByCode(vehicleId);

            Assert.IsType<OkObjectResult>(result);
            var okResult = (OkObjectResult)result;
            Assert.IsType<VehicleDTO>(okResult.Value);
        }

        [Fact]
        public async Task Remove_ValidId_ReturnsOkWithRemovedVehicleDto()
        {
            var vehicleController = new VehicleController(
                _dbContextMock.Object,
                _loggerMock.Object,
                _mapperMock.Object
            );

            var vehicleId = 1;
            var vehicle = new Vehicle { IdVehicle = vehicleId, Brand = "Toyota" };
            _dbContextMock.Setup(db => db.Vehicles.FirstOrDefaultAsync(It.IsAny<Func<Vehicle, bool>>()))
                .ReturnsAsync(vehicle);

            var result = await vehicleController.Remove(vehicleId);

            Assert.IsType<OkObjectResult>(result);
            var okResult = (OkObjectResult)result;
            Assert.IsType<VehicleDTO>(okResult.Value);
        }

    }
}