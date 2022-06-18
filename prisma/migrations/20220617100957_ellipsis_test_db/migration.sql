/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "Profile";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "lastSeen" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "conversation" (
    "conversationId" INTEGER NOT NULL,
    "conversationName" TEXT NOT NULL,

    CONSTRAINT "conversation_pkey" PRIMARY KEY ("conversationId")
);

-- CreateTable
CREATE TABLE "groupMember" (
    "userId" INTEGER NOT NULL,
    "conversationId" INTEGER NOT NULL,
    "joined_datetime" TIMESTAMP(3) NOT NULL,
    "left_datetime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "groupMember_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "message" (
    "id" INTEGER NOT NULL,
    "from" INTEGER NOT NULL,
    "message_text" JSONB NOT NULL,
    "sent_datetime" TIMESTAMP(3) NOT NULL,
    "conversation_id" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "user_userId_key" ON "user"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "message_id_key" ON "message"("id");

-- AddForeignKey
ALTER TABLE "groupMember" ADD CONSTRAINT "groupMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "groupMember" ADD CONSTRAINT "groupMember_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "conversation"("conversationId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_from_fkey" FOREIGN KEY ("from") REFERENCES "user"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
