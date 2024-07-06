using System.Security.Claims;
using Barkeeper.Data;
using Barkeeper.Models.GraphQL;
using HotChocolate.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options => {
        options.Authority = builder.Configuration["Auth0:Authority"];
        options.Audience = builder.Configuration["Auth0:Audience"];
        // options.TokenValidationParameters = new TokenValidationParameters {
        //     NameClaimType = ClaimTypes.NameIdentifier
        // };
    });

builder.Services.AddAuthorization();

builder.Services.AddCors(options => {
    options.AddDefaultPolicy(builder =>
        builder.AllowAnyOrigin().AllowAnyHeader());
});

builder.Services.AddPooledDbContextFactory<BarkeeperContext>(options => {
    options.UseNpgsql(builder.Configuration["ConnectionStrings:Database"]);
});


builder.Services
    .AddGraphQLServer()
    .AddAuthorization()
    .RegisterDbContext<BarkeeperContext>(DbContextKind.Pooled)
    .AddGlobalObjectIdentification()
    .AddFiltering()
    .AddSorting()
    .AddQueryType<Query>()
    .AddMutationType<Mutation>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment()) {

}
app.UseCors();
app.UseAuthentication();
app.UseAuthorization();

app.MapGraphQL()
    .RequireAuthorization();

app.MapBananaCakePop("/bananacakepop");

app.UseHttpsRedirection();

app.Run();
