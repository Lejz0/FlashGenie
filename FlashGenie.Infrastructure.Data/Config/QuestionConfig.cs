
using FlashGenie.Core.Constants;
using FlashGenie.Core.Entities.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.Text.Json;

namespace FlashGenie.Infrastructure.Data.Config
{
    public class QuestionConfig : IEntityTypeConfiguration<Question>
    {
        public void Configure(EntityTypeBuilder<Question> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).ValueGeneratedOnAdd();
            builder.HasOne(x => x.Collection)
                .WithMany(x => x.Questions)
                .HasForeignKey(x => x.CollectionId).OnDelete(DeleteBehavior.Cascade);
            builder.Property(x => x.Type).HasConversion(
                 to => JsonSerializer.Serialize(to, SerializationConstants.serializerOptions),
                 from => JsonSerializer.Deserialize<Type>(from, SerializationConstants.serializerOptions));
        }
    }
}
