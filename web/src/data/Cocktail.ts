import { useRequest } from "@/hooks/useRequest";
import { BarkeeperRouterContext } from "@/routes/__root";
import { Cocktail } from "@/types/Models";
import { PagedResult, PagingOptions } from "@/types/Utility";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { constructGetRequest } from "./Utility";
import { CocktailViewModel } from "@/types/ViewModels";
import { GetById } from "@/types/Request";

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
  cocktail: (options: {
    cocktailId: number;
    context: BarkeeperRouterContext;
  }) => {
    const queryKey = cocktailKeys.cocktail(options.cocktailId);
    const [url, body] = queryKey;
    const getFn = constructGetRequest<CocktailViewModel, GetById>({
      context: options.context,
      url,
      body,
    });
    return queryOptions({
      queryKey,
      queryFn: getFn,
    });
  },
};

export function useRecentCocktails(options: PagingOptions) {
  const queryKey = cocktailKeys.recentCocktails(options);
  const { get } = useRequest<PagedResult<Cocktail>, PagingOptions>(...queryKey);
  return useQuery({
    queryKey,
    queryFn: () => get(),
  });
}
