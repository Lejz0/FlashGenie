using FlashGenie.Core.Entities.Entities.Base;
using Microsoft.AspNetCore.Identity;

namespace FlashGenie.Core.Entities.Entities.Identity
{
    public class FlashGenieUser : IdentityUser
    {
        public FlashGenieUser(string name, string email)
        {
            Name = name;
            CreatedAt = DateTime.UtcNow;
            Collections = new List<Collection>();
            Email = email;
        }

        public string Name { get; set; }
        public DateTime CreatedAt { get; set; } 
        public ICollection<Collection> Collections { get; set; }
    }
}
