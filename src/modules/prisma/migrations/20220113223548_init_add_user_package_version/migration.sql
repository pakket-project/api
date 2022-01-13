-- CreateEnum
CREATE TYPE "Type" AS ENUM ('INTEL', 'SILICON');

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "username" VARCHAR(32) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "package" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "license" TEXT NOT NULL,
    "homepage" TEXT NOT NULL,
    "popularity" INTEGER NOT NULL,
    "authorId" UUID NOT NULL,

    CONSTRAINT "package_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "version" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "version" TEXT NOT NULL,
    "type" "Type"[],
    "popularity" INTEGER NOT NULL,
    "binaryUrl" TEXT NOT NULL,
    "packageId" UUID NOT NULL,

    CONSTRAINT "version_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_dependencies" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "package_name_key" ON "package"("name");

-- CreateIndex
CREATE UNIQUE INDEX "version_version_key" ON "version"("version");

-- CreateIndex
CREATE UNIQUE INDEX "_dependencies_AB_unique" ON "_dependencies"("A", "B");

-- CreateIndex
CREATE INDEX "_dependencies_B_index" ON "_dependencies"("B");

-- AddForeignKey
ALTER TABLE "package" ADD CONSTRAINT "package_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "version" ADD CONSTRAINT "version_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "package"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_dependencies" ADD FOREIGN KEY ("A") REFERENCES "version"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_dependencies" ADD FOREIGN KEY ("B") REFERENCES "version"("id") ON DELETE CASCADE ON UPDATE CASCADE;
