
using FlashGenie.Core.Entities.Entities;
using FlashGenie.Core.Entities.Entities.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Reflection;

namespace FlashGenie.Infrastructure.Data.Context
{
    public class FlashGenieDbContext : IdentityDbContext<FlashGenieUser>
    {
        public FlashGenieDbContext(DbContextOptions<FlashGenieDbContext> options)
           : base(options)
        {
        }

        public DbSet<FlashGenieUser> FlashGenieUsers { get; set; }
        public DbSet<Answer> Answers { get; set; }
        public DbSet<Collection> Collections { get; set; }
        public DbSet<Question> Questions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }
}
