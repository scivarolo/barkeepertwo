import { QueryParams } from "@/types/Request";
import { constructGetRequest, constructPostRequest } from "./Utility";
import { Product } from "@/types/Models";
import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";

export const productUrls = {
  getProductsForIngredient: "Product/GetProductsForIngredient",
  getAllProducts: "Product/GetAll",
  saveProduct: "Product/SaveProduct",
};

export const productKeys = {
  forIngredient: (id: number) => [productUrls.getProductsForIngredient, { IngredientId: id }] as const,
  all: () => [productUrls.getAllProducts] as const,
};

export const productQueries = {
  forIngredient: (ingredientId: number, options: QueryParams) => {
    const queryKey = productKeys.forIngredient(ingredientId);
    const queryFn = constructGetRequest<Product[], never>({
      auth: options.auth,
      url: `${productUrls.getProductsForIngredient}?IngredientId=${ingredientId}`,
    });
    return queryOptions({ queryKey, queryFn });
  },
  all: (options: QueryParams) => {
    const queryKey = productKeys.all();
    const queryFn = constructGetRequest<Product[], never>({
      auth: options.auth,
      url: queryKey[0],
    });
    return queryOptions({ queryKey, queryFn });
  },
};

export function useProductsForIngredient(ingredientId: number) {
  const auth = useAuth0();
  return useQuery(productQueries.forIngredient(ingredientId, { auth }));
}

export function useAllProducts() {
  const auth = useAuth0();
  return useQuery(productQueries.all({ auth }));
}

export function useSaveProduct(onSuccess?: (product: Product) => void) {
  const auth = useAuth0();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [productUrls.saveProduct],
    mutationFn: (body: { Id: number; Name: string; IngredientId: number; Size?: string }) =>
      constructPostRequest<Product, typeof body>({
        auth,
        url: productUrls.saveProduct,
        body,
      })(),
    onSuccess: (data) => {
      onSuccess?.(data);
      queryClient.invalidateQueries({
        queryKey: productKeys.forIngredient(data.IngredientId),
      });
      queryClient.invalidateQueries({
        queryKey: productKeys.all(),
      });
    },
  });
}
