import { Auth0ContextInterface, User } from "@auth0/auth0-react";
import ky from "ky";

const baseUrl = "https://localhost:7115/";

export function constructGetRequest<TResult, TRequestBody>(options: {
  auth: Auth0ContextInterface<User>;
  url: string;
  body?: TRequestBody;
}) {
  const { auth, url, body } = options;
  return async () => {
    const token = await auth.getAccessTokenSilently();

    const queryString = body
      ? "?" + new URLSearchParams(body as any).toString()
      : "";
    const finalUrl = baseUrl + url + queryString;
    return await ky
      .get<TResult>(finalUrl, {
        headers: { authorization: `Bearer ${token}` },
        timeout: false,
      })
      .json();
  };
}

export function constructPostRequest<TResult, TRequestBody>(options: {
  auth: Auth0ContextInterface<User>;
  url: string;
  body: TRequestBody;
}) {
  const { auth, url, body } = options;
  return async () => {
    const token = await auth.getAccessTokenSilently();

    var result = await ky
      .post<TResult>(baseUrl + url, {
        headers: { authorization: `Bearer ${token}` },
        timeout: false,
        json: body,
      })
      .json();

    return result;
  };
}
