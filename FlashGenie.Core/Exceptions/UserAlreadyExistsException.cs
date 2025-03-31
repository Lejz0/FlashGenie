
using System.Net;

namespace FlashGenie.Core.Exceptions
{
    public class UserAlreadyExistsException : Exception
    {
        public HttpStatusCode StatusCode = HttpStatusCode.Conflict;
        public UserAlreadyExistsException(string message) : base(message) { }
    }
}
