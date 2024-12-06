import H1 from "@/components/common/H1";
import OrderSummaryCard from "@/components/orders/OrderSummaryCard";
import OrdersActionCard from "@/components/orders/OrdersActionCard";
import { columns } from "@/components/tables/orders/columns";
import OrdersTable from "@/components/tables/orders/OrdersTable";

export default function OrdersPage() {
  // TODO: get all orders
  // const [orders, monthlyOrders, weeklyOrders] = await Promise.all([
  //   getOrders(),
  //   getMonthlyOrders(),
  //   getWeeklyOrders(),
  // ]);

  // const csvData = orders.map((order) => ({
  //   ID: formatOrderId(order),
  //   Type: order.type,
  //   Product: order.product.name,
  //   Quantity: order.quantity,
  //   Supplier: order.supplier.name,
  //   Status:
  //     orderStatuses.find((o) => o.value === order.status)?.label ||
  //     order.status,
  //   Amount: formatCurrency(order.totalPrice),
  //   Date: format(order.createdAt, "yyyy-MM-dd"),
  //   Operator: `${order.user.firstName} ${order.user.lastName}`,
  // }));

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
