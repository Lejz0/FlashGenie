
namespace FlashGenie.Core.DTOs.Response
{
    public class CollectionResponseDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int QuestionCount { get; set; }
        public string UserName { get; set; }
        public IEnumerable<QuestionResponseDTO> Questions { get; set; }
    }
}
