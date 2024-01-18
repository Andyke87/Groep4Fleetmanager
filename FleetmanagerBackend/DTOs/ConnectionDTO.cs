using System.ComponentModel.DataAnnotations;
namespace FleetManager.DTOs
{
    public class ConnectionDTO
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int IdDriver { get; set; }

        [Required]
        public int IdGasCard { get; set; }

        [Required]
        public int IdVehicle { get; set; }
    }
}
