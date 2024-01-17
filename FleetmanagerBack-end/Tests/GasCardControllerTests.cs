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
    public class GasCardControllerTests
    {
        private readonly Mock<FleetManagerContext> _dbContextMock;
        private readonly Mock<ILogger<GasCardController>> _loggerMock;
        private readonly Mock<IMapper> _mapperMock;

        public GasCardControllerTests()
        {
            _dbContextMock = new Mock<FleetManagerContext>();
            _loggerMock = new Mock<ILogger<GasCardController>>();
            _mapperMock = new Mock<IMapper>();
        }


        [Fact]
        public async Task GetByCode_ValidId_ReturnsOkWithGasCardDto()
        {
            var gasCardController = new GasCardController(
                _dbContextMock.Object,
                _loggerMock.Object,
                _mapperMock.Object
            );

            var gasCardId = 1;
            var gasCard = new GasCard { IdGasCard = gasCardId, CardNumber = "123456789" };
            _dbContextMock.Setup(db => db.GasCards.FirstOrDefaultAsync(It.IsAny<Func<GasCard, bool>>()))
                .ReturnsAsync(gasCard);

            var result = await gasCardController.GetByCode(gasCardId);

            Assert.IsType<OkObjectResult>(result);
            var okResult = (OkObjectResult)result;
            Assert.IsType<GasCardDTO>(okResult.Value);
        }

    }
}
