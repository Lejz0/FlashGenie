
namespace FlashGenie.Core.DTOs.Response
{
    public class AnswerResponseDTO
    {
        public string Text { get; set; }
        public bool IsCorrect { get; set; }
        public int DisplayOrder { get; set; }
        public Guid QuestionId { get; set; }
    }
}
