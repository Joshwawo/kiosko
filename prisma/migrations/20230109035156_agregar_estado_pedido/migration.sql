/*
  Warnings:

  - You are about to drop the column `precio` on the `Categoria` table. All the data in the column will be lost.

*/
-- AlterTable
-- ALTER TABLE `Categoria` DROP COLUMN `precio`;

-- AlterTable
ALTER TABLE `Orden` ADD COLUMN `estado` BOOLEAN NOT NULL DEFAULT false;
