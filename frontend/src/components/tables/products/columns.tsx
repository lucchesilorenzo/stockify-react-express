"use client";

import { Product } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronsUpDown } from "lucide-react";

import ProductActions from "@/components/products/product-actions";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { productStatuses } from "@/lib/data";
import { ProductStatus, ProductWithCategoryAndWarehouse } from "@/lib/types";
import { cn, formatCurrency } from "@/lib/utils";

export const columns: ColumnDef<ProductWithCategoryAndWarehouse>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const name: Product["name"] = row.getValue("name");

      return <div className="min-w-[150px] font-medium">{name}</div>;
    },
  },
  {
    accessorKey: "sku",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          SKU
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const sku: Product["sku"] = row.getValue("sku");

      return <div className="min-w-[150px]">{sku}</div>;
    },
  },
  {
    accessorKey: "category.name",
    id: "category.name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));
      const formattedCurrency = formatCurrency(amount);

      return <div>{formattedCurrency}</div>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status: ProductStatus["value"] = row.getValue("status");
      const statusInfo =
        productStatuses.find((p) => p.value === status)?.label || status;

      let statusColor: BadgeProps["variant"];

      if (status === "IN_STOCK") statusColor = "default";
      if (status === "OUT_OF_STOCK") statusColor = "destructive";
      if (status === "ARCHIVED") statusColor = "archived";

      return <Badge variant={statusColor}>{statusInfo}</Badge>;
    },
  },
  {
    accessorKey: "warehouse.name",
    id: "warehouse.name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Warehouse
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Quantity
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const quantity: number = row.getValue("quantity");
      const maxQuantity = row.original.maxQuantity;

      let quantityColor;

      switch (true) {
        case quantity <= 10:
          quantityColor = "bg-red-100 text-red-800";
          break;
        case quantity >= maxQuantity / 2:
          quantityColor = "bg-green-100 text-green-800";
          break;
        default:
          quantityColor = "bg-yellow-100 text-yellow-800";
      }

      return (
        <div
          className={cn(
            "inline-flex items-center rounded-full px-2.5 py-0.5 font-medium",
            quantityColor,
          )}
        >
          {quantity}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;

      return <ProductActions product={product} />;
    },
  },
];
