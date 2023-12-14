using AutoMapper;
using FleetManager.Models;

namespace FleetManager.Profiles
{
    public class MappingConfig : Profile
    {
        public MappingConfig()
        {
            CreateMap<Driver, DriverDTO>().ReverseMap();
            CreateMap<GasCard, GasCardDTO>().ReverseMap();
            CreateMap<Vehicle, VehicleDTO>().ReverseMap();
            CreateMap<Connection, ConnectionDTO>().ReverseMap();
            CreateMap<User, AuthenticationDTO>().ReverseMap();
        }
    }
}
