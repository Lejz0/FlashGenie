using FlashGenie.Core.DTOs.Request;
using FlashGenie.Infrastructure.Services.Interface;
using Microsoft.AspNetCore.Mvc;

namespace FlashGenie.Presentation.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionsController : ControllerBase
    {
        private readonly IGroqService _groqService;

        public QuestionsController(IGroqService groqService)
        {
            _groqService = groqService;
        }

        [HttpPost("generate")]
        public async Task<IActionResult> GenerateQuestions([FromBody] QuestionGenerationRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Text))
            {
                return BadRequest("Text is required.");
            }

            var response = await _groqService.GenerateQuestionsAsync(request.Text, 10);
            return Ok(response);
        }
    }
}
