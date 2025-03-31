﻿
using FlashGenie.Core.DTOs.Request;

namespace FlashGenie.Services.Interfaces.Services.Authentication
{
    public interface IAuthenticationService
    {
        Task<bool> RegisterAsync(FlashGenieUserRequestDTO requestUser);
        Task<bool> LoginAsync(string email, string password);
    }
}
