using FlashGenie.Presentation.Api.Middlewares;

namespace FlashGenie.Presentation.Api.RegisterServices
{
    public static class RegisterServices
    {
        public static void RegisterApiServices(this IServiceCollection services)
        {
            services.AddTransient<GlobalExceptionHandlingMiddleware>();
            services.AddLogging();
        }
    }
}
