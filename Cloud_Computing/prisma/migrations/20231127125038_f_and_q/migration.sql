/*
  Warnings:

  - Made the column `answer` on table `faq` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `faq` MODIFY `answer` TEXT NOT NULL;
