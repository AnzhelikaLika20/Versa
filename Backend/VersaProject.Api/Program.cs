using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;
using VersaProject.Bll.Extensions;
using VersaProject.Dal.Entities;
using VersaProject.Dal.Extensions;
using VersaProject.Dal.Infrastructure;
using VersaProject.Dal.Settings;

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<YandexCloudSettings>(builder.Configuration.GetSection(nameof(YandexCloudSettings)));
builder.Services.Configure<DatabaseSettings>(builder.Configuration.GetSection(nameof(DatabaseSettings)));
var config = builder.Configuration.GetRequiredSection(nameof(DatabaseSettings)).Get<DatabaseSettings>()!;
builder.Services.AddDalInfrastructure(config).AddDalRepositories();
builder.Services.AddBllServices();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey
    });
    options.OperationFilter<SecurityRequirementsOperationFilter>();
});

builder.Services.AddAuthentication();
builder.Services.AddAuthorizationBuilder();

builder.Services.AddIdentityCore<User>()
    .AddEntityFrameworkStores<ApplicationDbContext>();

builder.Services.AddIdentityApiEndpoints<User>();

builder.Services.Configure<IdentityOptions>(options =>
{
    options.Password.RequireDigit = true;
    options.Password.RequireLowercase = true;
    options.Password.RequireUppercase = true;
    options.Password.RequiredLength = 10;
    options.User.RequireUniqueEmail = true;
});

var app = builder.Build();
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();
app.MapControllers();
app.MapIdentityApi<User>();

using var scope = app.Services.CreateScope();
var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
await dbContext.Database.EnsureDeletedAsync();
await dbContext.Database.MigrateAsync();
app.Run();