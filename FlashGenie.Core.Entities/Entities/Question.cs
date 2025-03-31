
using FlashGenie.Core.Entities.Entities.Base;

namespace FlashGenie.Core.Entities.Entities
{
    public class Question : BaseEntity
    {
        public string Text { get; set; }
        public Type Type { get; set; }
        public virtual Collection Collection { get; set; }
        public Guid CollectionId { get; set; }
        public virtual ICollection<Answer> Answers { get; set; }
    }
}
