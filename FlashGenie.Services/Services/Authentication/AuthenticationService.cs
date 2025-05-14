
using AutoMapper;
using FlashGenie.Core.DTOs.Request;
using FlashGenie.Core.Entities.Entities.Identity;
using FlashGenie.Core.Exceptions;
using FlashGenie.Core.Interfaces.Repositories.Authentication;
using FlashGenie.Services.Interfaces.Services.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace FlashGenie.Services.Services.Authentication
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;
        public AuthenticationService(IUserRepository _userRepository, IMapper _mapper, IConfiguration configuration)
        {
            this._userRepository = _userRepository;
            this._mapper = _mapper;
            this._configuration = configuration;
        }
        public async Task<string> LoginAsync(string email, string password)
        {
            SignInResult result = await _userRepository.LoginAsync(email, password);

            if (!result.Succeeded)
            {
                throw new EmailOrPasswordIncorrectException("Email or password incorrect.");
            }

            var user = await _userRepository.GetUserByEmailAsync(email);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Name, user.Email)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
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
