import { QueryParams } from "@/types/Request";
import { constructGetRequest, constructPostRequest } from "./Utility";
import { UserIngredient } from "@/types/Models";
import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";

export const barUrls = {
  getIngredients: "Bar/GetIngredients",
  addIngredient: "Bar/AddIngredient",
  removeIngredient: "Bar/RemoveIngredient",
};

export const barKeys = {
  ingredients: () => [barUrls.getIngredients] as const,
};

export const barQueries = {
  barIngredients: (options: QueryParams) => {
    const queryKey = barKeys.ingredients();
    const queryFn = constructGetRequest<UserIngredient[], never>({
      auth: options.auth,
      url: queryKey[0],
    });
    return queryOptions({ queryKey, queryFn });
  },
};

export function useBarIngredients() {
  const auth = useAuth0();
  return useQuery(barQueries.barIngredients({ auth }));
}

export function useAddBarIngredient(onSuccess?: () => void) {
  const auth = useAuth0();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [barUrls.addIngredient],
    mutationFn: (ingredientId: number) =>
      constructPostRequest<UserIngredient, { IngredientId: number }>({
        auth,
        url: barUrls.addIngredient,
        body: { IngredientId: ingredientId },
      })(),
    onSuccess: () => {
      onSuccess?.();
      queryClient.invalidateQueries({
        queryKey: barKeys.ingredients(),
      });
    },
  });
}

export function useRemoveBarIngredient(onSuccess?: () => void) {
  const auth = useAuth0();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [barUrls.removeIngredient],
    mutationFn: (ingredientId: number) =>
      constructPostRequest<void, { IngredientId: number }>({
        auth,
        url: barUrls.removeIngredient,
        body: { IngredientId: ingredientId },
      })(),
    onSuccess: () => {
      onSuccess?.();
      queryClient.invalidateQueries({
        queryKey: barKeys.ingredients(),
      });
    },
  });
}
