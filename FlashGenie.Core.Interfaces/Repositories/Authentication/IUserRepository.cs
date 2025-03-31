
using FlashGenie.Core.Entities.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace FlashGenie.Core.Interfaces.Repositories.Authentication
{
    public interface IUserRepository
    {
        Task<IdentityResult> RegisterAsync(FlashGenieUser user, string password);
        Task<SignInResult> LoginAsync(string email, string password);
        Task<bool> UserAlreadyExistsAsync(string email);
    }
}
