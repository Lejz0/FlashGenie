using FlashGenie.Core.DTOs.Request;
using FlashGenie.Core.DTOs.Response;
using FlashGenie.Services.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace FlashGenie.Presentation.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionsController : ControllerBase
    {
        private readonly ICollectionService _collectionService;

        public QuestionsController(ICollectionService collectionService)
        {
            _collectionService = collectionService;
        }

        [HttpPost("generate")]
        public async Task<IActionResult> GenerateQuestions([FromBody] QuestionGenerationRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Text))
            {
                return BadRequest("Text is required.");
            }

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userId == null)
                return Unauthorized();

            CollectionResponseDTO response = await _collectionService.GenerateQuestionsAsync(request.Text, userId);
            return Ok(response);
        }
    }
}
