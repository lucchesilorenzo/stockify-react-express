/*
  Warnings:

  - You are about to drop the column `productId` on the `CustomerOrder` table. All the data in the column will be lost.
  - You are about to drop the column `totalAmount` on the `CustomerOrder` table. All the data in the column will be lost.
  - You are about to drop the column `subtotal` on the `CustomerOrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `totalPrice` on the `CustomerOrderItem` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CustomerOrder" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "customerId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "CustomerOrder_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CustomerOrder" ("createdAt", "customerId", "id", "status", "updatedAt") SELECT "createdAt", "customerId", "id", "status", "updatedAt" FROM "CustomerOrder";
DROP TABLE "CustomerOrder";
ALTER TABLE "new_CustomerOrder" RENAME TO "CustomerOrder";
CREATE TABLE "new_CustomerOrderItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "productId" TEXT NOT NULL,
    "customerOrderId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    CONSTRAINT "CustomerOrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CustomerOrderItem_customerOrderId_fkey" FOREIGN KEY ("customerOrderId") REFERENCES "CustomerOrder" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CustomerOrderItem" ("customerOrderId", "id", "productId", "quantity") SELECT "customerOrderId", "id", "productId", "quantity" FROM "CustomerOrderItem";
DROP TABLE "CustomerOrderItem";
ALTER TABLE "new_CustomerOrderItem" RENAME TO "CustomerOrderItem";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
