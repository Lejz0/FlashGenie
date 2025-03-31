
using System.Net;

namespace FlashGenie.Core.Exceptions
{
    public class RegistrationFaildException : Exception
    {
        public HttpStatusCode StatusCode = HttpStatusCode.BadRequest;
        public RegistrationFaildException(string message) : base(message){ }
    }
}
