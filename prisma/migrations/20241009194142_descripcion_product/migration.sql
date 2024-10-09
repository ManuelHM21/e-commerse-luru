-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "description" TEXT DEFAULT 'description',
ADD COLUMN     "rating" DOUBLE PRECISION NOT NULL DEFAULT 0;
