
using FlashGenie.Core.Interfaces.Repositories.Authentication;
using FlashGenie.Core.Interfaces.Repositories.IUnitOfWork;
using FlashGenie.Infrastructure.Data.Context;
using FlashGenie.Infrastructure.Data.Repositories.Authentication;
using FlashGenie.Infrastructure.Data.Repositories.UnitOfWork;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using FlashGenie.Core.Entities.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Hosting;
using FlashGenie.Core.Interfaces.Repositories;

namespace FlashGenie.Infrastructure.Data.RegisterServices
{
    public static class RegisterInfrastructureServices
    {
        public static void RegisterInfrasturcture(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<FlashGenieDbContext>(options =>
            {
                var connectionString = configuration.GetConnectionString("DefaultConnection");
                options.UseSqlServer(connectionString);
            });

            services.AddIdentity<FlashGenieUser, IdentityRole>()
             .AddEntityFrameworkStores<FlashGenieDbContext>()
            .AddDefaultTokenProviders();

            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            services.AddScoped<IUnitOfWork, UnitOfWork>();

            services.AddScoped<IUserRepository, UserRepository>();

            services.AddScoped<IUnitOfWork, UnitOfWork>();

            services.AddScoped<ICollectionRepository, ICollectionRepository>();
        }
    }
}
