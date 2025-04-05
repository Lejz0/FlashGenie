using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlashGenie.Core.DTOs
{
    public class AnswerDTO
    {
        public Guid Id { get; set; }
        public string Text { get; set; }
        public bool IsCorrect { get; set; } 
        public int DisplayOrder { get; set; }
    }
}
