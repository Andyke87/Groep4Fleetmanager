using System.ComponentModel.DataAnnotations;

namespace FleetManager.DTO
{
    public class SampleResponse
    {
        [Required]
        public int Id { get; set; }
        public string Name { get; set; }

    }
}