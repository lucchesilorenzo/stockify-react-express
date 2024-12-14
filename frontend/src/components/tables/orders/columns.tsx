import { Product } from "@stockify/backend/types";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ChevronsUpDown, Truck } from "lucide-react";

import OrderActions from "@/components/orders/OrderActions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { orderStatuses } from "@/lib/data";
import { DetailedOrder, OrderStatus, OrderType } from "@/lib/types";
import { capitalize, formatCurrency, formatOrderId } from "@/lib/utils";

export const columns: ColumnDef<DetailedOrder>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Order ID
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const order = row.original;

      return <div className="min-w-[150px]">{formatOrderId(order)}</div>;
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Type
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const type: OrderType["value"] = row.getValue("type");
      const formattedType = capitalize(type);

      return <Badge variant="outline">{formattedType}</Badge>;
    },
  },
  {
    accessorKey: "product.name",
    id: "product.name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Product
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const name: Product["name"] = row.getValue("product.name");

      return <div className="min-w-[150px] font-medium">{name}</div>;
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
  },
  {
    accessorKey: "supplier.name",
    id: "supplier.name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Supplier
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const supplier: string = row.getValue("supplier.name");

      return (
        <div className="flex min-w-[150px] items-center justify-center gap-2">
          <Truck className="h-4 w-4 text-muted-foreground" />{" "}
          <span>{supplier}</span>
        </div>
      );
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
      const status: OrderStatus["value"] = row.getValue("status");
      const statusInfo =
        orderStatuses.find((o) => o.value === status)?.label || status;

      return (
        <Badge variant={status === "SHIPPED" ? "secondary" : "default"}>
          {statusInfo}
        </Badge>
      );
    },
  },
  {
    accessorKey: "totalPrice",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalPrice"));
      const formattedCurrency = formatCurrency(amount);

      return <div>{formattedCurrency}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date: DetailedOrder["createdAt"] = row.getValue("createdAt");

      return (
        <div className="min-w-[150px] text-center">
          {format(date, "yyyy-MM-dd | HH:mm")}
        </div>
      );
    },
  },
  {
    accessorKey: "user",
    id: "user",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Operator
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const firstName = row.original.user.firstName;
      const lastName = row.original.user.lastName;

      return (
        <div className="min-w-[150px] font-medium">{`${firstName} ${lastName}`}</div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const order = row.original;

      return <OrderActions order={order} />;
    },
  },
];
