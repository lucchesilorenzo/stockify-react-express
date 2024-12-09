import { Order } from "@stockify/backend/types";
import { CalendarDays } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

type OrderSummaryCardProps = {
  type: "month" | "week";
  orders: Order[];
};

export default function OrderSummaryCard({
  type,
  orders,
}: OrderSummaryCardProps) {
  const totalOrdersLength = orders.length;
  const totalOrders = orders.reduce(
    (total, order) => total + order.totalPrice,
    0,
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="font-medium">
          This {type === "month" ? "Month" : "Week"}
        </CardTitle>
        <CalendarDays className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formatCurrency(totalOrders)}</div>
        <div className="text-xs text-muted-foreground">
          Orders this {type === "month" ? "month" : "week"}:
          <span className="ml-1 text-lg font-medium">{totalOrdersLength}</span>
        </div>
      </CardContent>
    </Card>
  );
}
