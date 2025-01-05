import { useAuth0 } from "@auth0/auth0-react";
import ky from "ky";
import { useCallback } from "react";

export function useRequest<T>(url: string, body: any) {
  const { getAccessTokenSilently } = useAuth0();
  const baseUrl = "http://localhost:5286/";

  const get = useCallback(async () => {
    const token = await getAccessTokenSilently();
    console.log({ token });
    const queryString = body ? "?" + new URLSearchParams(body).toString() : "";
    const finalUrl = baseUrl + url + queryString;
    return await ky
      .get<T>(finalUrl, {
        headers: { authorization: `Bearer ${token}` },
      })
      .json();
  }, [url, body, getAccessTokenSilently]);

  const post = useCallback(async () => {
    const token = await getAccessTokenSilently();
    return await ky
      .post<T>(baseUrl + url, {
        headers: { authorization: `Bearer ${token}` },
      })
      .json();
  }, [url, body, getAccessTokenSilently]);

  return { get, post };
}
