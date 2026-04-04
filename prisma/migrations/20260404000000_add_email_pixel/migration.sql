-- CreateTable
CREATE TABLE "EmailPixel" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmailPixel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailPixelOpen" (
    "id" TEXT NOT NULL,
    "pixelId" TEXT NOT NULL,
    "ip" TEXT NOT NULL DEFAULT '',
    "userAgent" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmailPixelOpen_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EmailPixel_slug_key" ON "EmailPixel"("slug");

-- CreateIndex
CREATE INDEX "EmailPixelOpen_pixelId_idx" ON "EmailPixelOpen"("pixelId");

-- AddForeignKey
ALTER TABLE "EmailPixelOpen" ADD CONSTRAINT "EmailPixelOpen_pixelId_fkey" FOREIGN KEY ("pixelId") REFERENCES "EmailPixel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
