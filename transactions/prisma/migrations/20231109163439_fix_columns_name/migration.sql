/*
  Warnings:

  - You are about to drop the column `from_account_id` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `origin_account_id` on the `transactions` table. All the data in the column will be lost.
  - Added the required column `transaction_from_account_id` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transaction_to_account_id` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_from_account_id_fkey";

-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_origin_account_id_fkey";

-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "from_account_id",
DROP COLUMN "origin_account_id",
ADD COLUMN     "transaction_from_account_id" TEXT NOT NULL,
ADD COLUMN     "transaction_to_account_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_transaction_to_account_id_fkey" FOREIGN KEY ("transaction_to_account_id") REFERENCES "accounts"("external_account_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_transaction_from_account_id_fkey" FOREIGN KEY ("transaction_from_account_id") REFERENCES "accounts"("external_account_id") ON DELETE RESTRICT ON UPDATE CASCADE;
