import AnalyticsInventoryTopProducts from "./AnalyticsInventoryTopProducts";

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
