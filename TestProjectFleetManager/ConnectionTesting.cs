using System.ComponentModel.DataAnnotations;


[TestClass]
public class ConnectionDTOTesting
{
    [TestMethod]
    public void TestConnectionDTOValidation()
    {
        // Arrange
        var connectionDTO = new ConnectionDTO
        {
            IdDriver = 1,
            IdGasCard = 1,
            IdVehicle = 1
        };

        // Act
        var validationContext = new ValidationContext(connectionDTO, null, null);
        var validationResults = new List<ValidationResult>();
        bool isValid = Validator.TryValidateObject(connectionDTO, validationContext, validationResults, true);

        // Assert
        Assert.IsTrue(isValid);
        Assert.AreEqual(0, validationResults.Count); 
    }

    [TestMethod]
    public void TestConnectionDTOValidationWithInvalidIdDriver()
    {
        // Arrange
        var connectionDTO = new ConnectionDTO
        {
            IdDriver = 0,
            IdGasCard = 0,
            IdVehicle = 0
        };

        // Act
        var validationContext = new ValidationContext(connectionDTO, null, null);
        var validationResults = new List<ValidationResult>();
        bool isValid = Validator.TryValidateObject(connectionDTO, validationContext, validationResults, true);

        // Assert
        Assert.IsTrue(isValid);

        var idDriverValidationResult = validationResults.SingleOrDefault(r => r.MemberNames.Contains(nameof(ConnectionDTO.IdDriver)));
    }
}

