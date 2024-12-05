import { useDashboardSummaryData } from "@/hooks/queries/useDashboardSummaryData";
import DashboardCard from "./dashboard-card";

import { dashboardData } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import Spinner from "../common/spinner";

export default function DashboardSummary() {
  const [
    { data: inventoryValue, isLoading: inventoryValueLoading },
    { data: lowStockProducts, isLoading: lowStockProductsLoading },
    { data: shippedOrders, isLoading: shippedOrdersLoading },
    { data: totalUnits, isLoading: totalUnitsLoading },
  ] = useDashboardSummaryData();

  const isLoading =
    inventoryValueLoading ||
    lowStockProductsLoading ||
    shippedOrdersLoading ||
    totalUnitsLoading;

  if (isLoading) return <Spinner size="large" />;

  // Updates dashboard data with new amount values
  const updatedDashboardData = [
    { ...dashboardData[0], amount: formatCurrency(inventoryValue) },
    { ...dashboardData[1], amount: lowStockProducts.toLocaleString() },
    { ...dashboardData[2], amount: shippedOrders.toLocaleString() },
    { ...dashboardData[3], amount: totalUnits.toLocaleString() },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {updatedDashboardData.map((card) => (
        <DashboardCard key={card.title} card={card} />
      ))}
    </div>
  );
}