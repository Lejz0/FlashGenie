
using AutoMapper;
using FlashGenie.Core.DTOs.Request;
using FlashGenie.Core.DTOs.Response;
using FlashGenie.Core.Entities.Entities.Identity;

namespace FlashGenie.Services.Mapping.AutoMapperProfiles
{
    public class FlashGenieUserProfile : Profile
    {
        public FlashGenieUserProfile()
        {
            CreateMap<FlashGenieUserRequestDTO, FlashGenieUser>();
            CreateMap<FlashGenieUser, FlashGenieUserResponseDTO>();
        }
    }
}
