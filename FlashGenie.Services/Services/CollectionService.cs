using FlashGenie.Core.DTOs.Response;
using FlashGenie.Core.DTOs;
using FlashGenie.Core.Interfaces.Repositories;
using FlashGenie.Services.Interfaces.Services;
using FlashGenie.Core.DTOs.Request;
using System.Text.Json;
using FlashGenie.Infrastructure.Services.Interface;
using AutoMapper;
using FlashGenie.Core.Interfaces.Repositories.IUnitOfWork;
using FlashGenie.Core.Entities.Entities;


namespace FlashGenie.Services.Services
{
    public class CollectionService : ICollectionService
    {
        private readonly ICollectionRepository _collectionRepository;
        private readonly IGroqService _groqService;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public CollectionService(ICollectionRepository collectionRepository, IGroqService groqService, IMapper mapper, IUnitOfWork unitOfWork)
        {
            _collectionRepository = collectionRepository;
            _groqService = groqService;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<CollectionResponseDTO>> GetAllCollectionsAsync()
        {
            var collections = await _collectionRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<CollectionResponseDTO>>(collections);
        }

        public async Task<CollectionResponseDTO> GetCollectionByIdAsync(Guid id)
        {
            var collection = await _collectionRepository.GetByIdAsync(id);
            if (collection == null)
                throw new InvalidOperationException($"Collection with ID {id} not found.");

            return _mapper.Map<CollectionResponseDTO>(collection);
        }

        public async Task<CollectionResponseDTO> DeleteCollectionAsync(Guid id)
        {
            var deletedCollection = await _collectionRepository.DeleteAsync(id);
            if (deletedCollection == null)
                throw new InvalidOperationException($"Collection with ID {id} not found.");

            return _mapper.Map<CollectionResponseDTO>(deletedCollection);
        }

        public async Task<IEnumerable<QuestionResponseDTO>> GetQuestionsByCollectionIdAsync(Guid collectionId)
        {
            var questions = await _collectionRepository.GetQuestionsByCollectionIdAsync(collectionId);
            return _mapper.Map<IEnumerable<QuestionResponseDTO>>(questions);
        }

        public async Task<CollectionResponseDTO> GenerateQuestionsAsync(string text, string userId)
        {
            var collectionDto = await _groqService.GenerateQuestionsAsync(text, 10);

            var collection = _collectionRepository.Create(_mapper.Map<Collection>(collectionDto));
            collection.UserId = userId;
            await _unitOfWork.SaveChangesAsync();

            return _mapper.Map<CollectionResponseDTO>(collection);
        }

    }
}
