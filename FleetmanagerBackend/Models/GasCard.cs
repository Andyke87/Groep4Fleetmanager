using System.ComponentModel.DataAnnotations;

namespace FleetManager.Models
{
    public partial class GasCard
    {
        [Key]
        public int IdGasCard { get; set; }
        [Required]
        public string CardNumber { get; set; }
        [Required]
        public DateTime ValidationDate { get; set; }

        public string? Pin { get; set; }
        [Required]
        public string Fuel { get; set; }
        [Required]
        public string BlockedCard { get; set; }
        public GasCard(string cardNumber, DateTime validationDate, string pin, string fuel, string blockedCard)
        {
            CardNumber = cardNumber;
            ValidationDate = validationDate;
            Pin = pin;
            Fuel = fuel;
            BlockedCard = blockedCard;
        }
    }
}
