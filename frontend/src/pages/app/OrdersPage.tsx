import H1 from "@/components/common/H1";
import OrderSummaryCard from "@/components/orders/OrderSummaryCard";
import OrdersActionCard from "@/components/orders/OrdersActionCard";
import { columns } from "@/components/tables/orders/columns";
import OrdersTable from "@/components/tables/orders/OrdersTable";
import { useOrders } from "@/hooks/queries/useOrders";
import { formatCurrency, formatOrderId } from "@/lib/utils";
import { format } from "date-fns";
import { orderStatuses } from "@/lib/data";
import Spinner from "@/components/common/Spinner";

export default function OrdersPage() {
  const [
    { data: orders, isLoading: ordersLoading },
    { data: monthlyOrders, isLoading: monthlyOrdersLoading },
    { data: weeklyOrders, isLoading: weeklyOrdersLoading },
  ] = useOrders();

  const isLoading =
    ordersLoading || monthlyOrdersLoading || weeklyOrdersLoading;

  if (isLoading) return <Spinner size="large" />;

  const csvData = orders.map((order) => ({
    ID: formatOrderId(order),
    Type: order.type,
    Product: order.product.name,
    Quantity: order.quantity,
    Supplier: order.supplier.name,
    Status:
      orderStatuses.find((o) => o.value === order.status)?.label ||
      order.status,
    Amount: formatCurrency(order.totalPrice),
    Date: format(order.createdAt, "yyyy-MM-dd"),
    Operator: `${order.user.firstName} ${order.user.lastName}`,
  }));

  return (
    <main>
      <H1>Orders</H1>

      <div className="my-6 w-full lg:hidden">
        <OrdersActionCard />
      </div>

      <div className="my-6 grid gap-6 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        <div className="hidden lg:block">
          <OrdersActionCard />
        </div>

        <OrderSummaryCard type="month" orders={monthlyOrders} />
        <OrderSummaryCard type="week" orders={weeklyOrders} />
      </div>

      <div className="my-6 grid grid-cols-1">
        <OrdersTable columns={columns} data={orders} csvData={csvData} />
      </div>
    </main>
  );
}
