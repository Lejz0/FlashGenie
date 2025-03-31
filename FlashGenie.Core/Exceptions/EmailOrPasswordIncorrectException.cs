
using System.Net;

namespace FlashGenie.Core.Exceptions
{
    public class EmailOrPasswordIncorrectException : Exception
    {
        public HttpStatusCode StatusCode = HttpStatusCode.Unauthorized;
        public EmailOrPasswordIncorrectException(string message) : base(message) { }
    }
}
