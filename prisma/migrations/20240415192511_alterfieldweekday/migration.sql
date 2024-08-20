/*
  Warnings:

  - You are about to drop the column `week_day` on the `user_time_intervals` table. All the data in the column will be lost.
  - Added the required column `week_day` to the `user_time_intervals` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_time_intervals" DROP COLUMN "weekDay",
ADD COLUMN     "week_day" INTEGER NOT NULL;
