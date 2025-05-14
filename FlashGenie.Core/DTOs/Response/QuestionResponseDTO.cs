
using FlashGenie.Core.Entities.Entities;
using FlashGenie.Core.Entities.Enums;

namespace FlashGenie.Core.DTOs.Response
{
    public class QuestionResponseDTO
    {
        public string Text { get; set; }
        public TypeEnum Type { get; set; }
        public Guid CollectionId { get; set; }
        public virtual ICollection<AnswerResponseDTO> Answers { get; set; }
    }
}
