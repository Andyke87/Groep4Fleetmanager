using System.ComponentModel.DataAnnotations;

namespace FleetManager.Models
{
    public partial class Tankkaart
    {
        [Key]
        public int IdTankkaart { get; set; }

        public string Kaartnummer { get; set; } = null!;

        public DateTime Geldigheidsdatum { get; set; }

        public string? Pincode { get; set; }

        public string Brandstoffen { get; set; } = null!;

        public bool Geblokkeerd { get; set; }
    }
}
