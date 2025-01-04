/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as ShoppingListIndexImport } from './routes/shopping-list/index'
import { Route as SettingsIndexImport } from './routes/settings/index'
import { Route as CompleteProfileIndexImport } from './routes/complete-profile/index'
import { Route as CocktailsIndexImport } from './routes/cocktails/index'
import { Route as BarIndexImport } from './routes/bar/index'

// Create/Update Routes

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const ShoppingListIndexRoute = ShoppingListIndexImport.update({
  id: '/shopping-list/',
  path: '/shopping-list/',
  getParentRoute: () => rootRoute,
} as any)

const SettingsIndexRoute = SettingsIndexImport.update({
  id: '/settings/',
  path: '/settings/',
  getParentRoute: () => rootRoute,
} as any)

const CompleteProfileIndexRoute = CompleteProfileIndexImport.update({
  id: '/complete-profile/',
  path: '/complete-profile/',
  getParentRoute: () => rootRoute,
} as any)

const CocktailsIndexRoute = CocktailsIndexImport.update({
  id: '/cocktails/',
  path: '/cocktails/',
  getParentRoute: () => rootRoute,
} as any)

const BarIndexRoute = BarIndexImport.update({
  id: '/bar/',
  path: '/bar/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/bar/': {
      id: '/bar/'
      path: '/bar'
      fullPath: '/bar'
      preLoaderRoute: typeof BarIndexImport
      parentRoute: typeof rootRoute
    }
    '/cocktails/': {
      id: '/cocktails/'
      path: '/cocktails'
      fullPath: '/cocktails'
      preLoaderRoute: typeof CocktailsIndexImport
      parentRoute: typeof rootRoute
    }
    '/complete-profile/': {
      id: '/complete-profile/'
      path: '/complete-profile'
      fullPath: '/complete-profile'
      preLoaderRoute: typeof CompleteProfileIndexImport
      parentRoute: typeof rootRoute
    }
    '/settings/': {
      id: '/settings/'
      path: '/settings'
      fullPath: '/settings'
      preLoaderRoute: typeof SettingsIndexImport
      parentRoute: typeof rootRoute
    }
    '/shopping-list/': {
      id: '/shopping-list/'
      path: '/shopping-list'
      fullPath: '/shopping-list'
      preLoaderRoute: typeof ShoppingListIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/bar': typeof BarIndexRoute
  '/cocktails': typeof CocktailsIndexRoute
  '/complete-profile': typeof CompleteProfileIndexRoute
  '/settings': typeof SettingsIndexRoute
  '/shopping-list': typeof ShoppingListIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/bar': typeof BarIndexRoute
  '/cocktails': typeof CocktailsIndexRoute
  '/complete-profile': typeof CompleteProfileIndexRoute
  '/settings': typeof SettingsIndexRoute
  '/shopping-list': typeof ShoppingListIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/bar/': typeof BarIndexRoute
  '/cocktails/': typeof CocktailsIndexRoute
  '/complete-profile/': typeof CompleteProfileIndexRoute
  '/settings/': typeof SettingsIndexRoute
  '/shopping-list/': typeof ShoppingListIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/bar'
    | '/cocktails'
    | '/complete-profile'
    | '/settings'
    | '/shopping-list'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/bar'
    | '/cocktails'
    | '/complete-profile'
    | '/settings'
    | '/shopping-list'
  id:
    | '__root__'
    | '/'
    | '/bar/'
    | '/cocktails/'
    | '/complete-profile/'
    | '/settings/'
    | '/shopping-list/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  BarIndexRoute: typeof BarIndexRoute
  CocktailsIndexRoute: typeof CocktailsIndexRoute
  CompleteProfileIndexRoute: typeof CompleteProfileIndexRoute
  SettingsIndexRoute: typeof SettingsIndexRoute
  ShoppingListIndexRoute: typeof ShoppingListIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  BarIndexRoute: BarIndexRoute,
  CocktailsIndexRoute: CocktailsIndexRoute,
  CompleteProfileIndexRoute: CompleteProfileIndexRoute,
  SettingsIndexRoute: SettingsIndexRoute,
  ShoppingListIndexRoute: ShoppingListIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/bar/",
        "/cocktails/",
        "/complete-profile/",
        "/settings/",
        "/shopping-list/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/bar/": {
      "filePath": "bar/index.tsx"
    },
    "/cocktails/": {
      "filePath": "cocktails/index.tsx"
    },
    "/complete-profile/": {
      "filePath": "complete-profile/index.tsx"
    },
    "/settings/": {
      "filePath": "settings/index.tsx"
    },
    "/shopping-list/": {
      "filePath": "shopping-list/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
