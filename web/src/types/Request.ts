import { Auth0ContextInterface, User } from "@auth0/auth0-react";
import { QueryOptions } from "@tanstack/react-query";

export interface GetById<T = number> {
  Id: T;
}

export type QueryParams<TRequest = undefined> = (TRequest extends undefined
  ? {}
  : { request: TRequest }) & {
  auth: Auth0ContextInterface<User>;
  options?: QueryOptions;
};

export type RequestBody<T> = {
  body: T;
};
