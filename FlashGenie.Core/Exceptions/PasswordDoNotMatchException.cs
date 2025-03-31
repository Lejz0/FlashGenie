
using System.Net;

namespace FlashGenie.Core.Exceptions
{
    public class PasswordDoNotMatchException : Exception
    {
        public HttpStatusCode StatusCode = HttpStatusCode.BadRequest;
        public PasswordDoNotMatchException(string message) : base(message){ }
    }
}
