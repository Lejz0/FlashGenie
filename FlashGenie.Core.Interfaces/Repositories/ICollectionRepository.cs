using FlashGenie.Core.Entities.Entities;
using FlashGenie.Core.Entities.Entities.Base;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlashGenie.Core.Interfaces.Repositories
{
    public interface ICollectionRepository
    {
        Task<IEnumerable<Collection>> GetAllAsync(); // List all collections
        Task<Collection> GetByIdAsync(BaseEntity id); // Fetch one collection by ID
        Task<Collection> DeleteAsync(BaseEntity id); // Delete a collection
        Task<IEnumerable<Question>> GetQuestionsByCollectionIdAsync(BaseEntity collectionId); // Get all questions from a collection

    }
}
