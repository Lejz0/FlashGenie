using FlashGenie.Core.DTOs.Request;
using FlashGenie.Infrastructure.Services.Interface;
using Microsoft.Extensions.Logging;
using System.Net.Http.Json;
using System.Text.Json;
using System.Text.RegularExpressions;

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

        public async Task<CollectionRequestDTO> GenerateQuestionsAsync(string content, int questionCount = 10)
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

                var result = await response.Content.ReadFromJsonAsync<OpenAIResponse>();
                if (result?.Choices == null || result.Choices.Length == 0 || string.IsNullOrWhiteSpace(result.Choices[0].Message.Content))
                    throw new Exception("Empty or invalid response from Groq.");

                var jsonContent = result.Choices[0].Message.Content;

                jsonContent = CleanJsonResponse(jsonContent);
                if (string.IsNullOrWhiteSpace(jsonContent))
                    throw new Exception("Cleaned JSON response is empty.");

                var collection = JsonSerializer.Deserialize<CollectionRequestDTO>(jsonContent, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });

                if (collection == null)
                    throw new Exception("Failed to deserialize response into CollectionRequestDTO.");

                foreach (var question in collection.Questions)
                {
                    var questionId = Guid.NewGuid();
                    foreach (var answer in question.Answers)
                    {
                        answer.QuestionId = questionId;
                    }
                }

                return collection;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while calling Groq API or parsing response");
                throw;
            }
        }

        private string CleanJsonResponse(string content)
        {
            if (string.IsNullOrWhiteSpace(content))
                return content;

            content = Regex.Replace(content, @"^```json\s*|\s*```$", "", RegexOptions.Multiline);
            content = content.Trim('`');
            content = content.Trim();

            return content;
        }

        private string GenerateBasePrompt(string content, int questionCount)
        {
            return $@"
                Generate a JSON object containing a quiz collection with the following structure:
                - name: (string) the name of the quiz collection
                - questionCount: (int) the number of questions
                - userId: (string) a placeholder user ID (e.g., 'default-user')
                - questions: an array of questions (as described below)

                Each question must contain:
                - type: one of 'SINGLE_CHOICE', 'MULTIPLE_CHOICE', or 'TRUE_FALSE'
                - question: (string) the text of the question
                - answers: an array of answer objects, each with:
                  - text: (string) the answer text
                  - isCorrect: (boolean) whether the answer is correct
                  - displayOrder: (int) the display order of the answer (0-based index)

                For TRUE_FALSE questions, answers must be exactly two entries: one for 'True' and one for 'False', with appropriate isCorrect values.

                Generate exactly {questionCount} questions based on the provided content.
                IMPORTANT: Return ONLY a valid JSON object, and nothing else. No markdown, no explanation, no backticks.

                Here is an example of the required structure:
                {{
                    ""name"": ""Generated Quiz"",
                    ""questionCount"": 2,
                    ""userId"": ""default-user"",
                    ""questions"": [
                        {{
                            ""type"": ""SINGLE_CHOICE"",
                            ""question"": ""What is the capital of France?"",
                            ""answers"": [
                                {{ ""text"": ""Paris"", ""isCorrect"": true, ""displayOrder"": 0 }},
                                {{ ""text"": ""London"", ""isCorrect"": false, ""displayOrder"": 1 }},
                                {{ ""text"": ""Rome"", ""isCorrect"": false, ""displayOrder"": 2 }},
                                {{ ""text"": ""Berlin"", ""isCorrect"": false, ""displayOrder"": 3 }}
                            ]
                        }},
                        {{
                            ""type"": ""TRUE_FALSE"",
                            ""question"": ""Is the Earth flat?"",
                            ""answers"": [
                                {{ ""text"": ""True"", ""isCorrect"": false, ""displayOrder"": 0 }},
                                {{ ""text"": ""False"", ""isCorrect"": true, ""displayOrder"": 1 }}
                            ]
                        }}
                    ]
                }}

                Here is the content to generate questions from:
                ---
                {content}
                ---
                ";
        }

        private class OpenAIResponse
        {
            public OpenAIChoice[] Choices { get; set; }
        }

        private class OpenAIChoice
        {
            public OpenAIMessage Message { get; set; }
        }

        private class OpenAIMessage
        {
            public string Content { get; set; }
        }
    }
}