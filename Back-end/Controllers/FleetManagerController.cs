using Back_end.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Back_end.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FleetmanagerController : ControllerBase
    {
        private readonly ILogger<FleetmanagerController> _logger;

        public FleetmanagerController(ILogger<FleetmanagerController> logger)
        {
            _logger = logger;
        }

        [HttpGet("Drivers")]
        public IEnumerable<Bestuurder> GetDrivers()
        {
            using (FleetManagerContext db = new FleetManagerContext())
            {
                return db.Bestuurders.ToList();
            }
        }

        [HttpGet("DriverById/{id}")]
        public Bestuurder GetDriverById(int id)
        {
            using (FleetManagerContext db = new FleetManagerContext())
            {
                return db.Bestuurders.Find(id);
            }
        }

        [HttpPost("AddDriver")]
        public void PostDriver([FromBody] Bestuurder bestuurder)
        {
            using (FleetManagerContext db = new FleetManagerContext())
            {
                db.Bestuurders.Add(bestuurder);
                db.SaveChanges();
            }
        }

        [HttpPut("UpdateDriver/{id}")]
        public void PutDriver(int id, [FromBody] Bestuurder bestuurder)
        {
            using (FleetManagerContext db = new FleetManagerContext())
            {
                db.Entry(bestuurder).State = EntityState.Modified;
                db.SaveChanges();
            }
        }

        [HttpDelete("DeleteDriver/{id}")]
        public void DeleteDriver(int id)
        {
            using (FleetManagerContext db = new FleetManagerContext())
            {
                Bestuurder bestuurder = db.Bestuurders.Find(id);
                db.Bestuurders.Remove(bestuurder);
                db.SaveChanges();
            }
        }

        [HttpGet("GasCards")]
        public IEnumerable<Tankkaart> GetGasCards()
        {
            using (FleetManagerContext db = new FleetManagerContext())
            {
                return db.Tankkaarts.ToList();
            }
        }
        [HttpGet("GasCardById")]
        public Tankkaart GetGasCardById(int id)
        {
            using (FleetManagerContext db = new FleetManagerContext())
            {
                return db.Tankkaarts.Find(id);
            }
        }
        [HttpPost("AddGasCard")]
        public void PostGasCard([FromBody] Tankkaart tankkaart)
        {
            using (FleetManagerContext db = new FleetManagerContext())
            {
                db.Tankkaarts.Add(tankkaart);
                db.SaveChanges();
            }
        }
        [HttpPut("UpdateGasCard")]
        public void PutGasCard(int id, [FromBody] Tankkaart tankkaart)
        {
            using (FleetManagerContext db = new FleetManagerContext())
            {
                db.Entry(tankkaart).State = EntityState.Modified;
                db.SaveChanges();
            }
        }
        [HttpDelete("DeleteGasCard")]
        public void DeleteGasCard(int id)
        {
            using (FleetManagerContext db = new FleetManagerContext())
            {
                Tankkaart tankkaart = db.Tankkaarts.Find(id);
                db.Tankkaarts.Remove(tankkaart);
                db.SaveChanges();
            }
        }
        [HttpGet("Vehicles")]
        public IEnumerable<Voertuig> GetVehicles()
        {
            using (FleetManagerContext db = new FleetManagerContext())
            {
                return db.Voertuigs.ToList();
            }
        }
        [HttpGet("VehicleById")]
        public Voertuig GetVehicleById(int id)
        {
            using (FleetManagerContext db = new FleetManagerContext())
            {
                return db.Voertuigs.Find(id);
            }
        }
        [HttpPost("AddVehicle")]
        public void PostVehicle([FromBody] Voertuig voertuig)
        {
            using (FleetManagerContext db = new FleetManagerContext())
            {
                db.Voertuigs.Add(voertuig);
                db.SaveChanges();
            }
        }
        [HttpPut("UpdateVehicle")]
        public void PutVehicle(int id, [FromBody] Voertuig voertuig)
        {
            using (FleetManagerContext db = new FleetManagerContext())
            {
                db.Entry(voertuig).State = EntityState.Modified;
                db.SaveChanges();
            }
        }
        [HttpDelete("DeleteVehicle")]
        public void DeleteVehicle(int id)
        {
            using (FleetManagerContext db = new FleetManagerContext())
            {
                Voertuig voertuig = db.Voertuigs.Find(id);
                db.Voertuigs.Remove(voertuig);
                db.SaveChanges();
            }
        }
        [HttpGet("Managers")]
        public IEnumerable<Manager> GetManagers()
        {
            using (FleetManagerContext db = new FleetManagerContext())
            {
                return db.Managers.ToList();
            }
        }
        [HttpGet("ManagerById")]
        public Manager GetManagerById(int id)
        {
            using (FleetManagerContext db = new FleetManagerContext())
            {
                return db.Managers.Find(id);
            }
        }
        [HttpPost("AddManager")]
        public void PostManager([FromBody] Manager manager)
        {
            using (FleetManagerContext db = new FleetManagerContext())
            {
                db.Managers.Add(manager);
                db.SaveChanges();
            }
        }
        [HttpPut("UpdateManager")]
        public void PutManager(int id, [FromBody] Manager manager)
        {
            using (FleetManagerContext db = new FleetManagerContext())
            {
                db.Entry(manager).State = EntityState.Modified;
                db.SaveChanges();
            }
        }
        [HttpDelete("DeleteManager")]
        public void DeleteManager(int id)
        {
            using (FleetManagerContext db = new FleetManagerContext())
            {
                Manager manager = db.Managers.Find(id);
                db.Managers.Remove(manager);
                db.SaveChanges();
            }
        }
        
    }
}
