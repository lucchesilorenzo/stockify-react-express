import { useState } from "react";

import { MoreHorizontal } from "lucide-react";

import MainAlertDialog from "../common/MainAlertDialog";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import OrderInvoiceDialog from "./OrderInvoiceDialog";

// import { updateOrderStatusAction } from "@/app/actions/order-actions";
import { DetailedOrder } from "@/lib/types";

type OrderActionsProps = {
  order: DetailedOrder;
};

export default function OrderActions({ order }: OrderActionsProps) {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);

  async function onUpdateOrderStatus() {
    // await updateOrderStatusAction(order.id);
    setIsAlertOpen(false);
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => setIsInvoiceOpen(true)}>
            View details
          </DropdownMenuItem>
          {order.status === "SHIPPED" && (
            <DropdownMenuItem onSelect={() => setIsAlertOpen(true)}>
              Update status
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <OrderInvoiceDialog
        open={isInvoiceOpen}
        setOpen={setIsInvoiceOpen}
        order={order}
      />

      <MainAlertDialog
        open={isAlertOpen}
        setOpen={setIsAlertOpen}
        onUpdateItemStatus={onUpdateOrderStatus}
        type="order"
      />
    </>
  );
}
