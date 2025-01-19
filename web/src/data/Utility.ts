import { BarkeeperRouterContext } from "@/routes/__root";
import ky from "ky";

const baseUrl = "https://localhost:7115/";

export function constructGetRequest<TResult, TRequestBody>(options: {
  context: BarkeeperRouterContext;
  url: string;
  body?: TRequestBody;
}) {
  const { context, url, body } = options;
  return async () => {
    var token = await context.auth.getAccessTokenSilently();

    const queryString = body
      ? "?" + new URLSearchParams(body as any).toString()
      : "";
    const finalUrl = baseUrl + url + queryString;
    return await ky
      .get<TResult>(finalUrl, {
        headers: { authorization: `Bearer ${token}` },
      })
      .json();
  };
}

export function constructPostRequest<TResult, TRequestBody>(options: {
  context: BarkeeperRouterContext;
  url: string;
  body: TRequestBody;
}) {
  const { context, url, body } = options;
  return async () => {
    var token = await context.auth.getAccessTokenSilently();
    return async () =>
      await ky
        .post<TResult>(baseUrl + url, {
          headers: { authorization: `Bearer ${token}` },
          json: body,
        })
        .json();
  };
}
