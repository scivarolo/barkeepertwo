export interface User {
  Id: string;
  CreatedAt: string;
  UpdatedAt: string;
  DisplayName: string;
}

export interface Cocktail {
  Id: number;
  Name: string;
  Instructions?: string;
  Notes?: string;
  CreatedById: string;
  CreatedAt: string;
  UpdatedAt: string;
  CocktailIngredients: CocktailIngredient[];
  CreatedBy: User;
  UserCocktails: UserCocktail[];
}

export interface CocktailIngredient {
  Id: number;
  Amount: number;
  Units: string;
  CocktailId: number;
  IngredientId: number;
  ProductId?: number;
  Order: number;
  Ingredient: Ingredient;
  Product?: Product;
}

export interface IngredientFormValues {
  Id: number;
  Name: string;
  CreatedById: string;
  IngredientTypeId?: string;
}

export interface Ingredient extends IngredientFormValues {
  CreatedAt: string;
  UpdatedAt: string;
  CocktailIngredients?: CocktailIngredient[];
  CreatedBy: User;
  IngredientType?: IngredientType;
}

export interface IngredientType {
  Id: number;
  Name: string;
  IsLiquid: boolean;
  Ingredients?: Ingredient[];
}

export interface Product {
  Id: number;
  Name: string;
  IngredientId: number;
  CreatedById: string;
  CreatedAt: string;
  UpdatedAt: string;
  CreatedBy: User;
  Ingredient: Ingredient;
}

export interface ShoppingItem {
  Id: number;
  Quantity: number;
  IngredientId?: number;
  ProductId?: number;
  UserId: string;
  DateAdded: string;
  Ingredient?: Ingredient;
  Product?: Product;
  User: User;
}

export interface TabCocktail {
  Id: number;
  CocktailId: number;
  TabId: number;
  UserId: string;
  Cocktail: Cocktail;
  User: User;
}

export interface UserCocktail {
  Id: number;
  UserId: string;
  CocktailId: number;
  DateAdded: string;
  Cocktail: Cocktail;
  User: User;
}

export interface UserHistory {
  Id: number;
  DrinkDate: string;
  UserId: string;
  CocktailId: number;
  Cocktail: Cocktail;
  User: User;
}

export interface UserIngredient {
  Id: number;
  UserId: string;
  IngredientId: number;
  DateAdded: string;
  Ingredient: Ingredient;
  User: User;
}

export interface UserProduct {
  Id: number;
  UserId: string;
  ProductId: number;
  DateAdded: string;
  Product: Product;
  User: User;
}
