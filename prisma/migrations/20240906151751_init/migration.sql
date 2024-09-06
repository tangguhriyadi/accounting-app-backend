/*
  Warnings:

  - A unique constraint covering the columns `[journal_id,account_id,side]` on the table `journal_account` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "journal_account_journal_id_account_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "journal_account_journal_id_account_id_side_key" ON "journal_account"("journal_id", "account_id", "side");
