-- AlterTable
ALTER TABLE "user" ADD COLUMN     "accountStatus" TEXT NOT NULL DEFAULT 'activate',
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'user';
