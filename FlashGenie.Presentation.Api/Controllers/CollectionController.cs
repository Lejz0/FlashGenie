using FlashGenie.Core.Entities.Entities.Base;
using FlashGenie.Services.Interfaces.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FlashGenie.Presentation.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CollectionController : ControllerBase
    {
        private readonly ICollectionService _collectionService;

        public CollectionController(ICollectionService collectionService)
        {
            _collectionService = collectionService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCollections()
        {
            var collections = await _collectionService.GetAllCollectionsAsync();
            return Ok(collections);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCollectionById(BaseEntity id)
        {
            try
            {
                var collection = await _collectionService.GetCollectionByIdAsync(id);
                return Ok(collection);
            }
            catch (InvalidOperationException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCollection(BaseEntity id)
        {
            try
            {
                var deletedCollection = await _collectionService.DeleteCollectionAsync(id);
                return Ok(deletedCollection);
            }
            catch (InvalidOperationException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpGet("{id}/questions")]
        public async Task<IActionResult> GetQuestionsByCollectionId(BaseEntity id)
        {
            var questions = await _collectionService.GetQuestionsByCollectionIdAsync(id);
            return Ok(questions);
        }
    }
}
