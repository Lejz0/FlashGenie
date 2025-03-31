
using FlashGenie.Services.Interfaces.Services.Authentication;
using FlashGenie.Services.Services.Authentication;
using Microsoft.Extensions.DependencyInjection;

namespace FlashGenie.Services.RegisterServices
{
    public static class RegisterServices
    {
        public static void Register(this IServiceCollection services)
        {
            services.AddScoped<IAuthenticationService, AuthenticationService>();
        }
    }
}
