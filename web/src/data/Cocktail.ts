import { Cocktail } from "@/types/Models";
import { PagedResult, PagingOptions } from "@/types/Utility";
import { queryOptions, useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { constructGetRequest, constructPostRequest } from "./Utility";
import { CocktailViewModel } from "@/types/ViewModels";
import { GetById, QueryParams, RequestBody, CreateCocktailRequest } from "@/types/Request";
import { useAuth0 } from "@auth0/auth0-react";

export const cocktailUrls = {
  cocktail: "Cocktail/GetCocktail",
  recentCocktails: "Cocktail/RecentCocktails",
  createCocktail: "Cocktail/CreateCocktail",
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
    const queryKey = cocktailKeys.cocktail(options.request.cocktailId);
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
    const queryKey = cocktailKeys.recentCocktails(options.request.body);
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
  return useQuery(
    cocktailQueries.recentCocktails({ auth, request: { body: options } }),
  );
}

export function useCreateCocktail(onSuccess?: (cocktail: Cocktail) => void) {
  const auth = useAuth0();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [cocktailUrls.createCocktail],
    mutationFn: (body: CreateCocktailRequest) =>
      constructPostRequest<Cocktail, CreateCocktailRequest>({
        auth,
        url: cocktailUrls.createCocktail,
        body
      })(),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [cocktailUrls.recentCocktails] });
      onSuccess?.(data);
    },
  });
}
