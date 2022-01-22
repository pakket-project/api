/*
  Warnings:

  - The values [INTEL,SILICON] on the enum `ArchType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `binaryUrl` on the `version` table. All the data in the column will be lost.
  - Added the required column `hash` to the `version` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'trusted_user', 'user');

-- AlterEnum
BEGIN;
CREATE TYPE "ArchType_new" AS ENUM ('intel', 'silicon');
ALTER TABLE "version" ALTER COLUMN "arch" TYPE "ArchType_new" USING ("arch"::text::"ArchType_new");
ALTER TYPE "ArchType" RENAME TO "ArchType_old";
ALTER TYPE "ArchType_new" RENAME TO "ArchType";
DROP TYPE "ArchType_old";
COMMIT;

-- AlterTable
ALTER TABLE "version" DROP COLUMN "binaryUrl",
ADD COLUMN     "hash" VARCHAR(64) NOT NULL;
