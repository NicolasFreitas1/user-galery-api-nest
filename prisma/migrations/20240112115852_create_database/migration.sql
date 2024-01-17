-- CreateTable
CREATE TABLE "user" (
    "id_user" SERIAL NOT NULL,
    "nm_user" VARCHAR(50) NOT NULL,
    "nm_login" VARCHAR(30) NOT NULL,
    "vl_password" VARCHAR(300) NOT NULL,
    "dt_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dt_updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "images" (
    "id_image" SERIAL NOT NULL,
    "id_user" INTEGER NOT NULL,
    "nm_image" VARCHAR(200) NOT NULL,
    "nm_mimetype" TEXT NOT NULL,
    "nm_stored" VARCHAR(200) NOT NULL,
    "vl_size_kb" DOUBLE PRECISION NOT NULL,
    "dt_created" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id_image")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_nm_login_key" ON "user"("nm_login");

-- CreateIndex
CREATE UNIQUE INDEX "images_nm_stored_key" ON "images"("nm_stored");

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "user"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;
