/*
  Warnings:

  - You are about to drop the `images` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "images" DROP CONSTRAINT "images_id_user_fkey";

-- DropTable
DROP TABLE "images";

-- CreateTable
CREATE TABLE "image" (
    "id_image" SERIAL NOT NULL,
    "id_user" INTEGER NOT NULL,
    "nm_image" VARCHAR(200) NOT NULL,
    "nm_mimetype" TEXT NOT NULL,
    "nm_stored" VARCHAR(200) NOT NULL,
    "vl_size_kb" DOUBLE PRECISION NOT NULL,
    "dt_created" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "image_pkey" PRIMARY KEY ("id_image")
);

-- CreateIndex
CREATE UNIQUE INDEX "image_nm_stored_key" ON "image"("nm_stored");

-- AddForeignKey
ALTER TABLE "image" ADD CONSTRAINT "image_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "user"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;
