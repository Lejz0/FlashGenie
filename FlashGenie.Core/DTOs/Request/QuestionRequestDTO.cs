
using System.Text.Json.Serialization;

namespace FlashGenie.Core.DTOs.Request
{
    public class QuestionRequestDTO
    {
        [JsonPropertyName("type")]
        public string Type { get; set; }

        [JsonPropertyName("question")]
        public string Text { get; set; }

        [JsonPropertyName("answers")]
        public ICollection<AnswerRequestDTO> Answers { get; set; }
    }
}
