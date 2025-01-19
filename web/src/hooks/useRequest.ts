import { useAuth0 } from "@auth0/auth0-react";
import ky from "ky";
import { useCallback } from "react";

export function useRequest<TResult, TRequestBody>(
  url: string,
  body?: TRequestBody,
) {
  const { getAccessTokenSilently } = useAuth0();
  const baseUrl = "https://localhost:7115/";

  const get = useCallback(async () => {
    const token = await getAccessTokenSilently();
    console.log({ token });
    const queryString = body
      ? "?" + new URLSearchParams(body as any).toString()
      : "";
    const finalUrl = baseUrl + url + queryString;
    return await ky
      .get<TResult>(finalUrl, {
        headers: { authorization: `Bearer ${token}` },
      })
      .json();
  }, [url, body, getAccessTokenSilently]);

  const post = useCallback(
    async (requestBody: TRequestBody) => {
      const token = await getAccessTokenSilently();
      return await ky
        .post<TResult>(baseUrl + url, {
          headers: { authorization: `Bearer ${token}` },
          json: requestBody ?? body,
        })
        .json();
    },
    [url, body, getAccessTokenSilently],
  );

  return { get, post };
}
