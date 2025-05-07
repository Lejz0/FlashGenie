using FlashGenie.Core.DTOs.Response;
using FlashGenie.Core.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FlashGenie.Core.Entities.Entities.Base;

namespace FlashGenie.Services.Interfaces.Services
{
    public interface ICollectionService
    {
        Task<IEnumerable<CollectionResponseDTO>> GetAllCollectionsAsync(); // Fetch all collections.
        Task<CollectionResponseDTO> GetCollectionByIdAsync(BaseEntity id); // Fetch a collection by ID.
        Task<CollectionResponseDTO> DeleteCollectionAsync(BaseEntity id); // Delete a collection and return it.
        Task<IEnumerable<QuestionDTO>> GetQuestionsByCollectionIdAsync(BaseEntity collectionId); // Retrieve questions from a collection.

    }
}
