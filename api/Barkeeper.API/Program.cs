using Barkeeper.Data;
using Barkeeper.Data.Interfaces;
using Barkeeper.Data.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Barkeeper.Extensions.Authorization;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
var builder = WebApplication.CreateBuilder(args);

var domain = builder.Configuration["Auth0:Domain"];

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options => {
        options.Authority = builder.Configuration["Auth0:Authority"];
        options.Audience = builder.Configuration["Auth0:Audience"];
        options.TokenValidationParameters = new TokenValidationParameters {
            NameClaimType = ClaimTypes.NameIdentifier
        };
    });

builder.Services.AddAuthorization(x => {
    x.AddPolicy(AuthPolicy.Admin, p => p.AddRequirements(new PermissionRequirement("admin", domain!)));
    x.AddPolicy(AuthPolicy.User, p => p.AddRequirements(new PermissionRequirement("user", domain!)));
});

builder.Services.AddSingleton<IAuthorizationHandler, HasPermissionHandler>();

builder.Services.AddCors(options => {
    options.AddDefaultPolicy(builder =>
        builder.AllowAnyOrigin().AllowAnyHeader());
});

builder.Services.AddDbContextPool<BarkeeperContext>(options => {
    options.UseNpgsql(
        builder.Configuration["ConnectionStrings:Database"],
        options => options.MigrationsAssembly("Barkeeper.Data")
    );
});
builder.Services
    .AddControllers()
    .AddJsonOptions(options => {
        options.JsonSerializerOptions.PropertyNamingPolicy = null;
    });

builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddSwaggerGen();


// Build App

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment()) {
    using var scope = app.Services.CreateScope();
    var env = scope.ServiceProvider.GetRequiredService<IHostEnvironment>();
    var dbContext = scope.ServiceProvider.GetRequiredService<BarkeeperContext>();
    dbContext.Database.Migrate();
}

app.UseCors();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

app.Run();
