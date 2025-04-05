using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlashGenie.Core.DTOs
{
    public class QuestionDTO
    {
        public Guid Id { get; set; }
        public string Text { get; set; }
        public Type Type { get; set; }
        public Guid CollectionId { get; set; }
        public IEnumerable<AnswerDTO> Answers { get; set; }
    }
}
