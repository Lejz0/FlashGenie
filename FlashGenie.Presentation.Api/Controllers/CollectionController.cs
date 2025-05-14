using FlashGenie.Services.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FlashGenie.Presentation.Api.Controllers
{
    [Authorize]
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
        public async Task<IActionResult> GetCollectionById(Guid id)
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
        public async Task<IActionResult> DeleteCollection(Guid id)
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
        public async Task<IActionResult> GetQuestionsByCollectionId(Guid id)
        {
            var questions = await _collectionService.GetQuestionsByCollectionIdAsync(id);
            return Ok(questions);
        }
    }
}
