
using FlashGenie.Core.Entities.Entities.Base;
using FlashGenie.Core.Entities.Entities.Identity;

namespace FlashGenie.Core.Entities.Entities
{
    public class Collection : BaseEntity
    {
        public string Name { get; set; }
        public int QuestionCount { get; set; }
        public virtual FlashGenieUser User { get; set; }
        public string UserId { get; set; }
        public virtual ICollection<Question> Questions { get; set; }
    }
}
