using FlashGenie.Core.DTOs.Response;
using FlashGenie.Infrastructure.Services.Interface;
using Microsoft.Extensions.Logging;
using System.Net.Http.Json;
using System.Text.Json;

namespace FlashGenie.Infrastructure.Services.Implementation
{
    public class GroqService : IGroqService
    {
        private readonly HttpClient _httpClient;
        private readonly ILogger<GroqService> _logger;

        public GroqService(HttpClient httpClient, ILogger<GroqService> logger)
        {
            _httpClient = httpClient;
            _logger = logger;
        }

        public async Task<GroqQuestionResponseDTO> GenerateQuestionsAsync(string content, int questionCount = 10)
        {
            var prompt = GenerateBasePrompt(content, questionCount);

            var payload = new
            {
                model = "meta-llama/llama-4-scout-17b-16e-instruct",
                messages = new[]
                {
            new { role = "user", content = prompt }
        }
            };

            try
            {
                var response = await _httpClient.PostAsJsonAsync("/openai/v1/chat/completions", payload);
                response.EnsureSuccessStatusCode();

                var result = await response.Content.ReadFromJsonAsync<GroqApiResponseDTO>();
                var jsonContent = result?.Choices?.FirstOrDefault()?.Message?.Content;

                if (string.IsNullOrWhiteSpace(jsonContent))
                    throw new Exception("Empty response from Groq.");

                string extractedJson = ExtractJsonFromResponse(jsonContent);

                var options = new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                };

                var questions = JsonSerializer.Deserialize<List<GeneratedQuestionDTO>>(extractedJson, options);
                return new GroqQuestionResponseDTO { Questions = questions };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while calling Groq API or parsing response");
                throw;
            }
        }

        private string ExtractJsonFromResponse(string response)
        {
            int startIndex = response.IndexOf('[');
            int endIndex = response.LastIndexOf(']');

            if (startIndex >= 0 && endIndex > startIndex)
            {
                return response.Substring(startIndex, endIndex - startIndex + 1);
            }


            startIndex = response.IndexOf("```");
            if (startIndex >= 0)
            {
                startIndex = response.IndexOf('[', startIndex);
                if (startIndex >= 0 && endIndex > startIndex)
                {
                    return response.Substring(startIndex, endIndex - startIndex + 1);
                }
            }

            return response;
        }

        private string GenerateBasePrompt(string content, int questionCount)
        {
            return $@"
            Generate {questionCount} quiz questions based on the content provided below. Each question should be one of the following types:
            - SINGLE_CHOICE
            - MULTIPLE_CHOICE
            - TRUE_FALSE

            For each question, return:
            - `type` (one of the three types above)
            - `question` (the text of the question)
            - `choices` (array of possible answers; TRUE_FALSE must be [""True"", ""False""])
            - `answers` (array of correct answers)

            IMPORTANT: Your ENTIRE response should be ONLY a valid JSON array. Do not include any explanatory text, markdown formatting, or backticks before or after the JSON. Just return the raw JSON array and nothing else.

            Example of what your entire response should look like:
            [
              {{
                ""type"": ""SINGLE_CHOICE"",
                ""question"": ""What is the capital of France?"",
                ""choices"": [""Paris"", ""London"", ""Rome"", ""Berlin""],
                ""answers"": [""Paris""]
              }},
              {{
                ""type"": ""MULTIPLE_CHOICE"",
                ""question"": ""Which of the following are programming languages?"",
                ""choices"": [""Python"", ""HTML"", ""C#"", ""CSS""],
                ""answers"": [""Python"", ""C#""]
              }}
            ]

            Here is the content to use:
            ---
            {content}
            ";
        }
    }
}
