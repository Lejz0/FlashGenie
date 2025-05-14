using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;

namespace FlashGenie.Core.DTOs.Request
{
    public class CollectionRequestDTO
    {
        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("questionCount")]
        public int QuestionCount { get; set; }
        public string UserId { get; set; }

        [JsonPropertyName("questions")]
        public IEnumerable<QuestionRequestDTO> Questions { get; set; }
    }
}
