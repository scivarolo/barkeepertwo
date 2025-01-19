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
import { Route as CocktailsCocktailIdImport } from './routes/cocktails/$cocktailId'
import { Route as CocktailsCocktailIdEditImport } from './routes/cocktails/$cocktailId.edit'

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

const CocktailsCocktailIdRoute = CocktailsCocktailIdImport.update({
  id: '/cocktails/$cocktailId',
  path: '/cocktails/$cocktailId',
  getParentRoute: () => rootRoute,
} as any)

const CocktailsCocktailIdEditRoute = CocktailsCocktailIdEditImport.update({
  id: '/edit',
  path: '/edit',
  getParentRoute: () => CocktailsCocktailIdRoute,
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
    '/cocktails/$cocktailId': {
      id: '/cocktails/$cocktailId'
      path: '/cocktails/$cocktailId'
      fullPath: '/cocktails/$cocktailId'
      preLoaderRoute: typeof CocktailsCocktailIdImport
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
    '/cocktails/$cocktailId/edit': {
      id: '/cocktails/$cocktailId/edit'
      path: '/edit'
      fullPath: '/cocktails/$cocktailId/edit'
      preLoaderRoute: typeof CocktailsCocktailIdEditImport
      parentRoute: typeof CocktailsCocktailIdImport
    }
  }
}

// Create and export the route tree

interface CocktailsCocktailIdRouteChildren {
  CocktailsCocktailIdEditRoute: typeof CocktailsCocktailIdEditRoute
}

const CocktailsCocktailIdRouteChildren: CocktailsCocktailIdRouteChildren = {
  CocktailsCocktailIdEditRoute: CocktailsCocktailIdEditRoute,
}

const CocktailsCocktailIdRouteWithChildren =
  CocktailsCocktailIdRoute._addFileChildren(CocktailsCocktailIdRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/cocktails/$cocktailId': typeof CocktailsCocktailIdRouteWithChildren
  '/bar': typeof BarIndexRoute
  '/cocktails': typeof CocktailsIndexRoute
  '/complete-profile': typeof CompleteProfileIndexRoute
  '/settings': typeof SettingsIndexRoute
  '/shopping-list': typeof ShoppingListIndexRoute
  '/cocktails/$cocktailId/edit': typeof CocktailsCocktailIdEditRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/cocktails/$cocktailId': typeof CocktailsCocktailIdRouteWithChildren
  '/bar': typeof BarIndexRoute
  '/cocktails': typeof CocktailsIndexRoute
  '/complete-profile': typeof CompleteProfileIndexRoute
  '/settings': typeof SettingsIndexRoute
  '/shopping-list': typeof ShoppingListIndexRoute
  '/cocktails/$cocktailId/edit': typeof CocktailsCocktailIdEditRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/cocktails/$cocktailId': typeof CocktailsCocktailIdRouteWithChildren
  '/bar/': typeof BarIndexRoute
  '/cocktails/': typeof CocktailsIndexRoute
  '/complete-profile/': typeof CompleteProfileIndexRoute
  '/settings/': typeof SettingsIndexRoute
  '/shopping-list/': typeof ShoppingListIndexRoute
  '/cocktails/$cocktailId/edit': typeof CocktailsCocktailIdEditRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/cocktails/$cocktailId'
    | '/bar'
    | '/cocktails'
    | '/complete-profile'
    | '/settings'
    | '/shopping-list'
    | '/cocktails/$cocktailId/edit'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/cocktails/$cocktailId'
    | '/bar'
    | '/cocktails'
    | '/complete-profile'
    | '/settings'
    | '/shopping-list'
    | '/cocktails/$cocktailId/edit'
  id:
    | '__root__'
    | '/'
    | '/cocktails/$cocktailId'
    | '/bar/'
    | '/cocktails/'
    | '/complete-profile/'
    | '/settings/'
    | '/shopping-list/'
    | '/cocktails/$cocktailId/edit'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  CocktailsCocktailIdRoute: typeof CocktailsCocktailIdRouteWithChildren
  BarIndexRoute: typeof BarIndexRoute
  CocktailsIndexRoute: typeof CocktailsIndexRoute
  CompleteProfileIndexRoute: typeof CompleteProfileIndexRoute
  SettingsIndexRoute: typeof SettingsIndexRoute
  ShoppingListIndexRoute: typeof ShoppingListIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  CocktailsCocktailIdRoute: CocktailsCocktailIdRouteWithChildren,
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
        "/cocktails/$cocktailId",
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
    "/cocktails/$cocktailId": {
      "filePath": "cocktails/$cocktailId.tsx",
      "children": [
        "/cocktails/$cocktailId/edit"
      ]
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
    },
    "/cocktails/$cocktailId/edit": {
      "filePath": "cocktails/$cocktailId.edit.tsx",
      "parent": "/cocktails/$cocktailId"
    }
  }
}
ROUTE_MANIFEST_END */
