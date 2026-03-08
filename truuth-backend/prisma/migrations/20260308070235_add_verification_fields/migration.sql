-- AlterTable
ALTER TABLE "Document" ADD COLUMN     "documentVerifyId" TEXT,
ADD COLUMN     "verificationResult" JSONB;
