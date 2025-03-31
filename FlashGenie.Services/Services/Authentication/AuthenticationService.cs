
using AutoMapper;
using FlashGenie.Core.DTOs.Request;
using FlashGenie.Core.Entities.Entities.Identity;
using FlashGenie.Core.Exceptions;
using FlashGenie.Core.Interfaces.Repositories.Authentication;
using FlashGenie.Services.Interfaces.Services.Authentication;
using Microsoft.AspNetCore.Identity;

namespace FlashGenie.Services.Services.Authentication
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        public AuthenticationService(IUserRepository _userRepository, IMapper _mapper)
        {
            this._userRepository = _userRepository;
            this._mapper = _mapper;
        }
        public async Task<bool> LoginAsync(string email, string password)
        {
            SignInResult result = await _userRepository.LoginAsync(email, password);
            if (!result.Succeeded) {
                throw new EmailOrPasswordIncorrectException("Email or password incorrect.");
            }
            return result.Succeeded;
        }

        public async Task<bool> RegisterAsync(FlashGenieUserRequestDTO registerUser)
        {
            if(registerUser.Password != registerUser.ConfirmPassword)
            {
                throw new PasswordDoNotMatchException("The passwords do not match.");
            }

            if (await _userRepository.UserAlreadyExistsAsync(registerUser.Email))
            {
                throw new UserAlreadyExistsException("User with the email:" + registerUser.Email + " already exists.");
            }

            FlashGenieUser user = _mapper.Map<FlashGenieUser>(registerUser);
            user.UserName = user.Name;
            IdentityResult result = await _userRepository.RegisterAsync(user, registerUser.Password);
            if (!result.Succeeded) {
                throw new RegistrationFaildException("registration faild try registering again.");
            }
            return result.Succeeded;
        }
    }
}
