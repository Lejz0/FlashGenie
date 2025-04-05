using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlashGenie.Core.DTOs.Response
{
    public class CollectionResponseDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int QuestionCount { get; set; }
        public string UserName { get; set; }
    }
}
