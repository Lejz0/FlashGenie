using FlashGenie.Core.DTOs.Request;
using FlashGenie.Services.Interfaces.Services.Authentication;
using Microsoft.AspNetCore.Mvc;

namespace FlashGenie.Presentation.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorizationController : ControllerBase
    {
        private readonly IAuthenticationService _authenticationService;

        public AuthorizationController(IAuthenticationService authenticationService)
        {
            _authenticationService = authenticationService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDTO loginRequest)
        {
            bool result = await _authenticationService.LoginAsync(loginRequest.Email, loginRequest.Password);
            return Ok("Login successful.");
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] FlashGenieUserRequestDTO registerRequest)
        {
            bool result = await _authenticationService.RegisterAsync(registerRequest);
            return Ok("Registration successful.");
        }
    }
}
