using System.Text.Json.Serialization;

namespace FlashGenie.Core.DTOs.Request
{
    public class QuestionGenerationRequest
    {
        [JsonPropertyName("text")]
        public string Text { get; set; }
    }
}
