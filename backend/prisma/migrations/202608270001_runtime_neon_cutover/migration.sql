ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "studentProfile" JSONB;

CREATE TABLE IF NOT EXISTS "ContentItem" (
  "id" TEXT NOT NULL,
  "category" TEXT NOT NULL,
  "stream" TEXT NOT NULL,
  "year" TEXT NOT NULL,
  "subject" TEXT NOT NULL,
  "type" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "linkOrFile" TEXT NOT NULL,
  "meta" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "ContentItem_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "ContentItem_category_idx" ON "ContentItem"("category");
CREATE INDEX IF NOT EXISTS "ContentItem_stream_idx" ON "ContentItem"("stream");
CREATE INDEX IF NOT EXISTS "ContentItem_subject_idx" ON "ContentItem"("subject");
CREATE INDEX IF NOT EXISTS "ContentItem_type_idx" ON "ContentItem"("type");
