
using FlashGenie.Core.Entities.Entities.Identity;
using FlashGenie.Core.Interfaces.Repositories.Authentication;
using Microsoft.AspNetCore.Identity;

namespace FlashGenie.Infrastructure.Data.Repositories.Authentication
{
    public class UserRepository : IUserRepository
    {
        private readonly UserManager<FlashGenieUser> _userManager;
        private readonly SignInManager<FlashGenieUser> _signInManager;

        public UserRepository(UserManager<FlashGenieUser> userManager, SignInManager<FlashGenieUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        public async Task<IdentityResult> RegisterAsync(FlashGenieUser user, string password)
        {
            return await _userManager.CreateAsync(user, password);
        }

        public async Task<SignInResult> LoginAsync(string email, string password)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
                return SignInResult.Failed;

            return await _signInManager.PasswordSignInAsync(user, password, isPersistent: false, lockoutOnFailure: false);
        }

        public async Task<bool> UserAlreadyExistsAsync(string email)
        {
            var existingUser = await _userManager.FindByEmailAsync(email);
            if (existingUser != null)
            {
                return true;  
            }
            return false;
        }

        public async Task<FlashGenieUser> GetUserByEmailAsync(string email)
        {
            return await _userManager.FindByEmailAsync(email);
        }
    }
}
