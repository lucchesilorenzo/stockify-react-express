import OrderInvoice from "./order-invoice";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DetailedOrder } from "@/lib/types";

type OrderInvoiceDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  order: DetailedOrder;
};

export default function OrderInvoiceDialog({
  open,
  setOpen,
  order,
}: OrderInvoiceDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Order Invoice Details</DialogTitle>
          <DialogDescription>View order invoice details.</DialogDescription>
        </DialogHeader>
        <OrderInvoice order={order} />
      </DialogContent>
    </Dialog>
  );
}
