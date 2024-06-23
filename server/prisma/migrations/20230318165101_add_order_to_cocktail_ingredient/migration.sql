/*
  Warnings:

  - Added the required column `order` to the `CocktailIngredient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CocktailIngredient" ADD COLUMN     "order" INTEGER NOT NULL;
