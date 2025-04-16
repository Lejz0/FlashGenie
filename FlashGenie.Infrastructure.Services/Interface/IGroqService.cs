using FlashGenie.Core.DTOs.Response;

namespace FlashGenie.Infrastructure.Services.Interface
{
    public interface IGroqService
    {
        Task<GroqQuestionResponseDTO> GenerateQuestionsAsync(string content, int questionCount = 10);
    }
}
