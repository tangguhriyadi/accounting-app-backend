/*
  Warnings:

  - Added the required column `side` to the `journal_account` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "JournalSide" AS ENUM ('DEBIT', 'CREDIT');

-- AlterTable
ALTER TABLE "journal_account" ADD COLUMN     "side" "JournalSide" NOT NULL;
