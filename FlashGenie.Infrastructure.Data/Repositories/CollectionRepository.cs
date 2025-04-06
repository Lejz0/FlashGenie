﻿using FlashGenie.Core.Entities.Entities;
using FlashGenie.Core.Entities.Entities.Base;
using FlashGenie.Core.Interfaces.Repositories;
using FlashGenie.Infrastructure.Data.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
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

        public async Task<Collection> DeleteAsync(BaseEntity id)
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
            .Include(c => c.User) // Include user relationship for context.
            .Include(c => c.Questions) // Include related questions.
            .ToListAsync();

        }

        public async Task<Collection> GetByIdAsync(BaseEntity id)
        {
            return await _context.Collections
            .Include(c => c.User) // Include user relationship.
            .Include(c => c.Questions) // Include related questions.
            .FirstOrDefaultAsync(c => c.Id == id.Id);

        }

        public async Task<IEnumerable<Question>> GetQuestionsByCollectionIdAsync(BaseEntity collectionId)
        {
            return await _context.Questions
            .Where(q => q.CollectionId == collectionId.Id) // Filter by CollectionId
            .ToListAsync();

        }
    }
}
