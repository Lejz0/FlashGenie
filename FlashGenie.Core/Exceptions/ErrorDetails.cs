
using Newtonsoft.Json;
using System.Net;

namespace FlashGenie.Core.Exceptions
{
    public class ErrorDetails
    {
        public HttpStatusCode StatusCode { get; set; }
        public string Message { get; set; }
        public string Title { get; set; }
        public string? Details { get; set; }
        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}
