/* eslint-disable @typescript-eslint/no-unused-vars */
type ExtractPathParams<T extends string> =
  T extends `${infer _Start}:${infer Param}/${infer Rest}`
    ? { [k in Param | keyof ExtractPathParams<Rest>]: string }
    : T extends `${infer _Start}:${infer Param}`
    ? { [k in Param]: string }
    : undefined;
/* eslint-enable @typescript-eslint/no-unused-vars */

type ConstructPath<
  T extends string,
  P extends object | undefined
> = T extends `${infer _Start}:${infer Param}/${infer Rest}`
  ? P extends { [K in Param | keyof ExtractPathParams<Rest>]: string }
    ? `${_Start}${string}/${ConstructPath<Rest, P>}`
    : never
  : T extends `${infer _Start}:${infer Param}`
  ? P extends { [K in Param]: string }
    ? `${_Start}${string}`
    : never
  : T;

export interface Path<T extends string> {
  title: string;
  path: T;
  url: keyof ExtractPathParams<T> extends never
    ? () => ConstructPath<T, ExtractPathParams<T>>
    : (params: ExtractPathParams<T>) => ConstructPath<T, ExtractPathParams<T>>;
}

export interface AppRoutes {
  dashboard: Path<"/">;
  cocktails: Path<"/cocktails">;
  bar: Path<"/bar">;
  shoppingList: Path<"/shopping-list">;
  settings: Path<"/settings">;
  completeProfile: Path<"/complete-profile">;
}

export const routes: AppRoutes = {
  dashboard: {
    title: "Dashboard",
    path: "/",
    url: () => "/",
  },
  cocktails: {
    title: "Cocktails",
    path: "/cocktails",
    url: () => "/cocktails",
  },
  bar: {
    title: "Bar",
    path: "/bar",
    url: () => "/bar",
  },
  shoppingList: {
    title: "Shopping List",
    path: "/shopping-list",
    url: () => "/shopping-list",
  },
  settings: {
    title: "Settings",
    path: "/settings",
    url: () => "/settings",
  },
  completeProfile: {
    title: "Complete Your Profile",
    path: "/complete-profile",
    url: () => "/complete-profile",
  },
};
