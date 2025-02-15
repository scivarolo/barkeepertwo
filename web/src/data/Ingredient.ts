import { GetById, QueryParams } from "@/types/Request";
import { constructGetRequest, constructPostRequest } from "./Utility";
import { Ingredient, IngredientFormValues } from "@/types/Models";
import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";

export const ingredientUrls = {
  ingredient: "Ingredient/Get",
  ingredients: "Ingredient/GetIngredients",
  saveIngredient: "Ingredient/SaveIngredient",
};

export const ingredientKeys = {
  ingredient: (ingredientId: number) =>
    [ingredientUrls.ingredient, { Id: ingredientId } as GetById] as const,
  ingredients: () => [ingredientUrls.ingredients] as const,
};

export const ingredientQueries = {
  ingredient: (options: QueryParams<GetById>) => {
    const queryKey = ingredientKeys.ingredient(options.request.Id);
    const queryFn = constructGetRequest<Ingredient, GetById>({
      auth: options.auth,
      url: queryKey[0],
      body: options.request,
    });
    return queryOptions({ queryKey, queryFn });
  },
  ingredients: (options: QueryParams) => {
    const queryKey = ingredientKeys.ingredients();
    const queryFn = constructGetRequest<Ingredient[], never>({
      auth: options.auth,
      url: queryKey[0],
    });
    return queryOptions({ queryKey, queryFn });
  },
};

export function useIngredients() {
  const auth = useAuth0();
  return useQuery(ingredientQueries.ingredients({ auth }));
}

export function useSaveIngredient(onSuccess?: () => void) {
  const auth = useAuth0();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [ingredientUrls.saveIngredient],
    mutationFn: (body: IngredientFormValues) =>
      constructPostRequest<Ingredient, IngredientFormValues>({
        auth,
        url: ingredientUrls.saveIngredient,
        body,
      })(),
    onSuccess: () => {
      onSuccess?.();
      queryClient.invalidateQueries({
        queryKey: ingredientKeys.ingredients(),
      });
    },
  });
}
