using FlashGenie.Core.Entities.Entities.Base;
using FlashGenie.Core.Interfaces.Repositories.IUnitOfWork;
using FlashGenie.Infrastructure.Data.Context;

namespace FlashGenie.Infrastructure.Data.Repositories.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly FlashGenieDbContext _context;
        public UnitOfWork(FlashGenieDbContext context)
        {
            _context = context;
        }

        public async Task SaveChangesAsync()
        {
            var entries = _context.ChangeTracker.Entries<BaseEntity>();
            var now = DateTime.UtcNow;

            foreach (var entry in entries)
            {
                if (entry.State == Microsoft.EntityFrameworkCore.EntityState.Added)
                {
                    entry.Entity.CreatedAt = now;
                    entry.Entity.UpdatedAt = now;
                }
                else if (entry.State == Microsoft.EntityFrameworkCore.EntityState.Modified)
                {
                    entry.Entity.UpdatedAt = now;
                }
            }

            await _context.SaveChangesAsync();
        }
    }
}
