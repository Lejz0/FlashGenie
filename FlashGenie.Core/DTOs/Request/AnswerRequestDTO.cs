
using System.Text.Json.Serialization;

namespace FlashGenie.Core.DTOs.Request
{
    public class AnswerRequestDTO
    {
        [JsonPropertyName("text")]
        public string Text { get; set; }

        [JsonPropertyName("isCorrect")]
        public bool IsCorrect { get; set; }

        [JsonPropertyName("displayOrder")]
        public int DisplayOrder { get; set; }
        public Guid QuestionId { get; set; }
    }
}
