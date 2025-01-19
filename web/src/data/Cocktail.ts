import { useRequest } from "@/hooks/useRequest";
import { Cocktail } from "@/types/Models";
import { PagedResult, PagingOptions } from "@/types/Utility";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const cocktailUrls = {
  cocktail: "Cocktail/Get",
  recentCocktails: "Cocktail/RecentCocktails",
};

export const cocktailKeys = {
  cocktail: (Id: number) => [cocktailUrls.cocktail, { Id }] as const,
  recentCocktails: (request: PagingOptions) =>
    [cocktailUrls.recentCocktails, request] as const,
};

export function useRecentCocktails(options: PagingOptions) {
  const queryKey = cocktailKeys.recentCocktails(options);
  const { get } = useRequest<PagedResult<Cocktail>, PagingOptions>(...queryKey);
  return useQuery({
    queryKey,
    queryFn: () => get(),
  });
}

export getCocktailQueryOptions = (cocktailId: number) => queryOptions({
  queryKey: cocktailKeys.cocktail(cocktailId),
  queryFn: () =>
})
