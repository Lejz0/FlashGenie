namespace FlashGenie.Core.DTOs.Response
{
    public class GeneratedQuestionDTO
    {
        public string Type { get; set; }
        public string Question { get; set; }
        public List<string> Choices { get; set; }
        public List<string> Answers { get; set; }
    }
}
