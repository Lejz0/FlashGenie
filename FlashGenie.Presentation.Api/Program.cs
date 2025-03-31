using FlashGenie.Core.ApplicationOptions;
using FlashGenie.Infrastructure.Data.RegisterServices;
using FlashGenie.Presentation.Api.Middlewares;
using FlashGenie.Presentation.Api.RegisterServices;
using FlashGenie.Services.RegisterServices;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.Configure<ConnectionOptions>(
    builder.Configuration.GetSection(ConnectionOptions.Key));
builder.Services.RegisterInfrasturcture(builder.Configuration);
builder.Services.Register();
builder.Services.RegisterApiServices();

builder.Services.AddSwaggerGen(c =>
{
    c.CustomSchemaIds(type => type.FullName);
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyMethod()
                  .AllowAnyHeader();
        });
});

var app = builder.Build();

app.UseCors("AllowAllOrigins");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
