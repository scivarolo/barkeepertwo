import { CocktailIngredient } from "./Models";

export interface CocktailViewModel {
  Id: number;
  Name: string;
  Instructions?: string;
  Notes?: string;
  CreatedById: string;
  CreatedByName: string;
  CreatedAt: string;
  UpdatedAt: string;
  CocktailIngredients: CocktailIngredient[];
  CountLast30Days?: number;
}
