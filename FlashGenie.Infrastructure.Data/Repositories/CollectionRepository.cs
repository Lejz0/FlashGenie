using FlashGenie.Core.Entities.Entities;
using FlashGenie.Core.Entities.Entities.Base;
using FlashGenie.Core.Interfaces.Repositories;
using FlashGenie.Infrastructure.Data.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlashGenie.Infrastructure.Data.Repositories
{
    public class CollectionRepository : ICollectionRepository
    {
        private readonly FlashGenieDbContext _context;

        public CollectionRepository(FlashGenieDbContext context)
        {
            _context = context;
        }

        public Collection Create(Collection collection)
        {
            return _context.Collections.Add(collection).Entity;
        }

        public async Task<Collection> DeleteAsync(Guid id)
        {
            var collection = await GetByIdAsync(id);
            if (collection != null)
            {
                _context.Collections.Remove(collection);
                await _context.SaveChangesAsync();
            }
            return collection;
        }

        public async Task<IEnumerable<Collection>> GetAllAsync()
        {
            return await _context.Collections
                .Include(c => c.User) 
                .Include(c => c.Questions)
                    .ThenInclude(q => q.Answers) 
                .ToListAsync();
        }

        public async Task<Collection> GetByIdAsync(Guid id)
        {
            return await _context.Collections
                .Include(c => c.User) 
                .Include(c => c.Questions)
                    .ThenInclude(q => q.Answers) 
                .FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<IEnumerable<Question>> GetQuestionsByCollectionIdAsync(Guid collectionId)
        {
            return await _context.Questions
                .Where(q => q.CollectionId == collectionId) 
                .Include(q => q.Answers) 
                .ToListAsync();
        }
    }
}