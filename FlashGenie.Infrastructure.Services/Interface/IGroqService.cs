using FlashGenie.Core.DTOs.Request;
using FlashGenie.Core.DTOs.Response;

namespace FlashGenie.Infrastructure.Services.Interface
{
    public interface IGroqService
    {
        Task<CollectionRequestDTO> GenerateQuestionsAsync(string content, int questionCount = 10);
    }
}
