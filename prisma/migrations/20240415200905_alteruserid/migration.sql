/*
  Warnings:

  - You are about to drop the column `userId` on the `schedulings` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `schedulings` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "schedulings" DROP CONSTRAINT "schedulings_userId_fkey";

-- AlterTable
ALTER TABLE "schedulings" DROP COLUMN "userId",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "schedulings" ADD CONSTRAINT "schedulings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
