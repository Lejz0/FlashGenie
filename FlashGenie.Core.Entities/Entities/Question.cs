
using FlashGenie.Core.Entities.Entities.Base;
using FlashGenie.Core.Entities.Enums;
namespace FlashGenie.Core.Entities.Entities
{
    public class Question : BaseEntity
    {
        public string Text { get; set; }
        public TypeEnum Type { get; set; }
        public virtual Collection Collection { get; set; }
        public Guid CollectionId { get; set; }
        public virtual ICollection<Answer> Answers { get; set; }
    }
}
