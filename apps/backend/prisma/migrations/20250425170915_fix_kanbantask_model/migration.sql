/*
  Warnings:

  - You are about to drop the column `userId` on the `KanbanTask` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "KanbanTask" DROP CONSTRAINT "KanbanTask_userId_fkey";

-- AlterTable
ALTER TABLE "KanbanTask" DROP COLUMN "userId";
