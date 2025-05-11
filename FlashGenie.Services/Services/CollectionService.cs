using FlashGenie.Core.DTOs.Response;
using FlashGenie.Core.DTOs;
using FlashGenie.Core.Interfaces.Repositories;
using FlashGenie.Services.Interfaces.Services;


namespace FlashGenie.Services.Services
{
    public class CollectionService : ICollectionService
    {
        private readonly ICollectionRepository _collectionRepository;

        public CollectionService(ICollectionRepository collectionRepository)
        {
            _collectionRepository = collectionRepository;
        }

        public async Task<IEnumerable<CollectionResponseDTO>> GetAllCollectionsAsync()
        {
            var collections = await _collectionRepository.GetAllAsync();
            return collections.Select(c => new CollectionResponseDTO
            {
                Id = c.Id,
                Name = c.Name,
                QuestionCount = c.Questions.Count,
                UserName = c.User.Name,
                Questions = c.Questions.Select(q => new QuestionDTO
                {
                    Id = q.Id,
                    Text = q.Text,
                    Type = q.Type,
                    Answers = q.Answers.Select(a => new AnswerDTO
                    {
                        Id = a.Id,
                        Text = a.Text,
                        IsCorrect = a.isCorrect,
                        DisplayOrder = a.DisplayOrder
                    }).ToList()
                }).ToList()
            }).ToList();
        }

        public async Task<CollectionResponseDTO> GetCollectionByIdAsync(Guid id)
        {
            var collection = await _collectionRepository.GetByIdAsync(id);
            if (collection == null)
                throw new InvalidOperationException($"Collection with ID {id} not found.");

            return new CollectionResponseDTO
            {
                Id = collection.Id,
                Name = collection.Name,
                QuestionCount = collection.Questions.Count,
                UserName = collection.User.Name,
                Questions = collection.Questions.Select(q => new QuestionDTO
                {
                    Id = q.Id,
                    Text = q.Text,
                    Type = q.Type,
                    Answers = q.Answers.Select(a => new AnswerDTO
                    {
                        Id = a.Id,
                        Text = a.Text,
                        IsCorrect = a.isCorrect,
                        DisplayOrder = a.DisplayOrder
                    }).ToList()
                }).ToList()
            };
        }

        public async Task<CollectionResponseDTO> DeleteCollectionAsync(Guid id)
        {
            var deletedCollection = await _collectionRepository.DeleteAsync(id);
            if (deletedCollection == null)
                throw new InvalidOperationException($"Collection with ID {id} not found.");

            return new CollectionResponseDTO
            {
                Id = deletedCollection.Id,
                Name = deletedCollection.Name,
                QuestionCount = deletedCollection.Questions.Count,
                UserName = deletedCollection.User.Name,
                Questions = deletedCollection.Questions.Select(q => new QuestionDTO
                {
                    Id = q.Id,
                    Text = q.Text,
                    Type = q.Type,
                    Answers = q.Answers.Select(a => new AnswerDTO
                    {
                        Id = a.Id,
                        Text = a.Text,
                        IsCorrect = a.isCorrect,
                        DisplayOrder = a.DisplayOrder
                    }).ToList()
                }).ToList()
            };
        }

        public async Task<IEnumerable<QuestionDTO>> GetQuestionsByCollectionIdAsync(Guid collectionId)
        {
            var questions = await _collectionRepository.GetQuestionsByCollectionIdAsync(collectionId);
            return questions.Select(q => new QuestionDTO
            {
                Id = q.Id,
                Text = q.Text,
                Type = q.Type,
                Answers = q.Answers.Select(a => new AnswerDTO
                {
                    Id = a.Id,
                    Text = a.Text,
                    IsCorrect = a.isCorrect,
                    DisplayOrder = a.DisplayOrder
                }).ToList()
            }).ToList();
        }
    }
}
