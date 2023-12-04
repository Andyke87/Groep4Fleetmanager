using System.ComponentModel.DataAnnotations;

namespace FleetManager.Models
{
    public partial class GasCard
    {
        [Key]
        public int IdGasCard { get; set; }

        public string CardNumber { get; set; } = null!;

        public DateTime ValidationDate { get; set; }

        public string? Pin { get; set; }

        public string Fuel { get; set; } = null!;

        public string Blocked { get; set; }
        public GasCard()
        {
        }
        public GasCard(string cardNumber, DateTime validationDate, string pin, string fuel, string blocked)
        {
            CardNumber = cardNumber;
            ValidationDate = validationDate;
            Pin = pin;
            Fuel = fuel;
            Blocked = blocked;
        }
    }
}
