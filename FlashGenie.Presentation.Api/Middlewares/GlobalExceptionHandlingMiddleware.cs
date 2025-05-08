
using FlashGenie.Core.Exceptions;
using System.Net;

namespace FlashGenie.Presentation.Api.Middlewares
{
    public class GlobalExceptionHandlingMiddleware : IMiddleware
    {
        private readonly ILogger<GlobalExceptionHandlingMiddleware> _logger;
        public GlobalExceptionHandlingMiddleware(ILogger<GlobalExceptionHandlingMiddleware> _logger)
        {
            this._logger = _logger;
        }
        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try
            {
                await next(context);
            }
            catch (ArgumentNullException anEx)
            {
                _logger.LogError($"A new argument null exception has been thrown: {anEx}");
                await HandleExceptionAsync(context, anEx);
            }
            catch (EmailOrPasswordIncorrectException eopEx)
            {
                _logger.LogError($"A new bad request exception has been thrown: {eopEx}");
                await HandleExceptionAsync(context, eopEx);
            }
            catch (PasswordDoNotMatchException pdnmEx)
            {
                _logger.LogError($"A new bad request exception has been thrown: {pdnmEx}");
                await HandleExceptionAsync(context, pdnmEx);
            }
            catch (RegistrationFaildException rfEx)
            {
                _logger.LogError($"A new registration faild exception has been thrown: {rfEx}");
                await HandleExceptionAsync(context, rfEx);
            }
            catch (UserAlreadyExistsException uoeEx)
            {
                _logger.LogError($"A new user already exists exception has been thrown: {uoeEx}");
                await HandleExceptionAsync(context, uoeEx);
            }
            catch (ObjectIsNullException oine)
            {
                _logger.LogError($"The object doesn't exist exception has been thrown: {oine}");
                await HandleExceptionAsync(context, oine);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                await HandleExceptionAsync(context, ex);
            }
        }

        private async Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            context.Response.ContentType = "application/json";
            var (statusCode, title, message, details) = exception switch
            {
                ArgumentNullException exce => (HttpStatusCode.InternalServerError, "Internal Server Error", exce.Message, exce.InnerException?.Message),
                EmailOrPasswordIncorrectException exce => (exce.StatusCode, "Unouthorised", exce.Message, null),
                PasswordDoNotMatchException exce => (exce.StatusCode, "Bad Request", exce.Message, null),
                RegistrationFaildException exce => (exce.StatusCode, "Bad Request", exce.Message, null),
                UserAlreadyExistsException exce => (exce.StatusCode, "Already Exists In Data Base", exce.Message, null),
                _ => (HttpStatusCode.InternalServerError, "Internal Server Error", exception?.Message, exception?.InnerException?.Message)
            };

            await context.Response.WriteAsync(new ErrorDetails()
            {
                StatusCode = statusCode,
                Message = message,
                Title = title,
                Details = details
            }.ToString());
        }
    }
}
