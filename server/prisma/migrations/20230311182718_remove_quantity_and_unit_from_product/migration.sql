/*
  Warnings:

  - You are about to drop the column `quantity` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `unit` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "quantity",
DROP COLUMN "unit";
