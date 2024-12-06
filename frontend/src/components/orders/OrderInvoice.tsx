import { format } from "date-fns";

import OrderInvoiceItem from "./OrderInvoiceItem";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DetailedOrder } from "@/lib/types";
import { formatOrderId } from "@/lib/utils";

type OrderInvoiceProps = {
  order: DetailedOrder;
};

export default function OrderInvoice({ order }: OrderInvoiceProps) {
  if (!order) return null;

  const orderInvoiceData = [
    {
      id: 1,
      label: `${order.product.name} x ${order.quantity}`,
      amount: order.subtotal,
    },
    {
      id: 2,
      label: "Subtotal",
      amount: order.subtotal,
    },
    {
      id: 3,
      label: "Shipping",
      amount: order.shipping,
    },
    {
      id: 4,
      label: "Tax",
      amount: order.tax,
    },
    {
      id: 5,
      label: "Total",
      amount: order.totalPrice,
    },
  ];

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-muted">
        <div className="grid gap-0.5">
          <CardTitle className="flex items-center gap-2 text-lg">
            Order # {formatOrderId(order)}
          </CardTitle>
          <CardDescription>
            Date: {format(order.createdAt, "PPP")} <br />
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="mb-1 font-semibold">Order Details</div>
        <ul className="grid gap-3">
          {orderInvoiceData.map((item) => (
            <OrderInvoiceItem key={item.id} item={item} />
          ))}
        </ul>
      </CardContent>
      <CardFooter className="flex items-center border-t bg-muted px-6 py-3">
        <div className="text-xs text-muted-foreground">
          Updated{" "}
          <time dateTime={order.updatedAt.toISOString()}>
            {format(order.updatedAt, "PPP")} <br />
          </time>
        </div>
      </CardFooter>
    </Card>
  );
}
