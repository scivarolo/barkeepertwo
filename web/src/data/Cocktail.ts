import { Cocktail } from "@/types/Models";
import { PagedResult, PagingOptions } from "@/types/Utility";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { constructGetRequest } from "./Utility";
import { CocktailViewModel } from "@/types/ViewModels";
import { GetById, QueryParams, RequestBody } from "@/types/Request";
import { useAuth0 } from "@auth0/auth0-react";

export const cocktailUrls = {
  cocktail: "Cocktail/GetCocktail",
  recentCocktails: "Cocktail/RecentCocktails",
};

export const cocktailKeys = {
  cocktail: (Id: number) => [cocktailUrls.cocktail, { Id } as GetById] as const,
  recentCocktails: (request: PagingOptions) =>
    [cocktailUrls.recentCocktails, request] as const,
};

export const cocktailQueries = {
  cocktail: (
    options: QueryParams<{
      cocktailId: number;
    }>,
  ) => {
    const queryKey = cocktailKeys.cocktail(options.cocktailId);
    const [url, body] = queryKey;
    const queryFn = constructGetRequest<CocktailViewModel, GetById>({
      auth: options.auth,
      url,
      body,
    });
    return queryOptions({
      queryKey,
      queryFn,
    });
  },
  recentCocktails: (options: QueryParams<RequestBody<PagingOptions>>) => {
    const queryKey = cocktailKeys.recentCocktails(options.body);
    const [url, body] = queryKey;
    const queryFn = constructGetRequest<PagedResult<Cocktail>, PagingOptions>({
      auth: options.auth,
      url,
      body,
    });
    return queryOptions({
      queryKey,
      queryFn,
    });
  },
};

export function useRecentCocktails(options: PagingOptions) {
  const auth = useAuth0();
  return useQuery(cocktailQueries.recentCocktails({ auth, body: options }));
}
