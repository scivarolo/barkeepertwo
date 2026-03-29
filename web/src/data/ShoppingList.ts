import { QueryParams } from "@/types/Request";
import { constructGetRequest, constructPostRequest } from "./Utility";
import { ShoppingItem } from "@/types/Models";
import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { barKeys } from "./Bar";

export const shoppingUrls = {
  getItems: "Shopping/GetItems",
  addItem: "Shopping/AddItem",
  removeItem: "Shopping/RemoveItem",
  purchaseItem: "Shopping/PurchaseItem",
};

export const shoppingKeys = {
  items: () => [shoppingUrls.getItems] as const,
};

export const shoppingQueries = {
  items: (options: QueryParams) => {
    const queryKey = shoppingKeys.items();
    const queryFn = constructGetRequest<ShoppingItem[], never>({
      auth: options.auth,
      url: queryKey[0],
    });
    return queryOptions({ queryKey, queryFn });
  },
};

export function useShoppingItems() {
  const auth = useAuth0();
  return useQuery(shoppingQueries.items({ auth }));
}

export function useAddShoppingItem(onSuccess?: () => void) {
  const auth = useAuth0();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [shoppingUrls.addItem],
    mutationFn: (payload: { IngredientId?: number; ProductId?: number; Quantity: number }) =>
      constructPostRequest<ShoppingItem, typeof payload>({
        auth,
        url: shoppingUrls.addItem,
        body: payload,
      })(),
    onSuccess: () => {
      onSuccess?.();
      queryClient.invalidateQueries({
        queryKey: shoppingKeys.items(),
      });
    },
  });
}

export function useRemoveShoppingItem(onSuccess?: () => void) {
  const auth = useAuth0();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [shoppingUrls.removeItem],
    mutationFn: (id: number) =>
      constructPostRequest<void, { Id: number }>({
        auth,
        url: shoppingUrls.removeItem,
        body: { Id: id },
      })(),
    onSuccess: () => {
      onSuccess?.();
      queryClient.invalidateQueries({
        queryKey: shoppingKeys.items(),
      });
    },
  });
}

export function usePurchaseShoppingItem(onSuccess?: () => void) {
  const auth = useAuth0();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [shoppingUrls.purchaseItem],
    mutationFn: (id: number) =>
      constructPostRequest<void, { Id: number }>({
        auth,
        url: shoppingUrls.purchaseItem,
        body: { Id: id },
      })(),
    onSuccess: () => {
      onSuccess?.();
      queryClient.invalidateQueries({
        queryKey: shoppingKeys.items(),
      });
      queryClient.invalidateQueries({
        queryKey: barKeys.ingredients(),
      });
      queryClient.invalidateQueries({
        queryKey: barKeys.products(),
      });
    },
  });
}
