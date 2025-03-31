
using FlashGenie.Core.Entities.Entities.Base;

namespace FlashGenie.Core.Entities.Entities
{
    public class Answer : BaseEntity
    {
        public string Text { get; set; }
        public bool isCorrect { get; set; }
        public int DisplayOrder { get; set; }
        public virtual Question Question { get; set; }
        public Guid QuestionId { get; set; }
    }
}
