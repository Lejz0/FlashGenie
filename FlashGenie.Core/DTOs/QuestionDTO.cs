using FlashGenie.Core.Entities.Enums;

namespace FlashGenie.Core.DTOs
{
    public class QuestionDTO
    {
        public Guid Id { get; set; }
        public string Text { get; set; }
        public TypeEnum Type { get; set; }
        public Guid CollectionId { get; set; }
        public IEnumerable<AnswerDTO> Answers { get; set; }
    }
}
