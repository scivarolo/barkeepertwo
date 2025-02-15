import { constructGetRequest, constructPostRequest } from "@/data/Utility";
import { useAuth0 } from "@auth0/auth0-react";
import { useCallback } from "react";

export function useGetRequest<TResult, TRequestBody>(
  url: string,
  body?: TRequestBody,
) {
  const auth = useAuth0();

  return useCallback(async () => {
    const request = constructGetRequest<TResult, TRequestBody>({
      auth,
      url,
      body,
    });
    return await request();
  }, [url, body, auth]);
}
export function usePostRequest<TResult, TRequestBody>(url: string) {
  const auth = useAuth0();

  return useCallback(
    async (requestBody: TRequestBody) => {
      const request = constructPostRequest<TResult, TRequestBody>({
        auth,
        url,
        body: requestBody,
      });
      return await request();
    },
    [url, auth],
  );
}
