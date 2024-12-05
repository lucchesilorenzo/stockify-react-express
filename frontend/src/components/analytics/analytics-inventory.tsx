import AnalyticsInventoryTopProducts from "./analytics-inventory-top-products";

type AnalyticsInventoryProps = {
  barChartData: {
    product: string;
    value: number;
  }[];
};

export default function AnalyticsInventory({
  barChartData,
}: AnalyticsInventoryProps) {
  return (
    <div>
      <AnalyticsInventoryTopProducts barChartData={barChartData} />
    </div>
  );
}
