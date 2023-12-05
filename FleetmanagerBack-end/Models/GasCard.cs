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
        public DateTime ValidationDate { 
            get{
                return ValidationDate;
            } 
            set{
                if (value <= DateTime.Now.AddDays(14))
                {
                    throw new ArgumentException("Validation date must be at least 14 days from now");
                }
                else 
                {
                    ValidationDate = value;
                }
            }
        }

        public string? Pin { get; set; }
        [Required]
        public string Fuel { get; set; }
        [Required]
        public string Blocked { get; set; }
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
