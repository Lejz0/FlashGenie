
using FlashGenie.Core.Entities.Entities.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FlashGenie.Infrastructure.Data.Config
{
    public class FlashGenieUserConfig : IEntityTypeConfiguration<FlashGenieUser>
    {
        public void Configure(EntityTypeBuilder<FlashGenieUser> builder)
        {
            builder.HasKey(t => t.Id);
        }
    }
}
