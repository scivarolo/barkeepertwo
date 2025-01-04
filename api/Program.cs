using System.Security.Claims;
using Barkeeper.Data;
using Barkeeper.Data.DataLoaders;
using Barkeeper.Data.Resolvers;
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

builder.Services.AddDbContextPool<BarkeeperContext>(options => {
    options.UseNpgsql(builder.Configuration["ConnectionStrings:Database"]);
});


builder.Services
    .AddGraphQLServer()
    .AddAuthorization()
    .RegisterDbContext<BarkeeperContext>(DbContextKind.Resolver)
    .AddQueryType<Query>()
    .AddMutationType<Mutation>()
    .AddDataLoader<CocktailIngredientDataLoader>()
    .AddDataLoader<IngredientDataLoader>()
    .AddGlobalObjectIdentification()
    .AddProjections()
    .AddFiltering()
    .AddSorting();

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
