import { useAnalyticsData } from "@/hooks/queries/useAnalyticsData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import AnalyticsInventory from "./AnalyticsInventory";
import AnalyticsOverview from "./AnalyticsOverview";
import Spinner from "../common/Spinner";

export default function AnalyticsTabs() {
  const [
    { data: pieChart, isLoading: pieChartDataLoading },
    { data: monthlyInventoryValues, isLoading: monthlyInventoryValuesLoading },
    { data: topProducts, isLoading: topProductsLoading },
  ] = useAnalyticsData();

  const { pieChartData, pieChartConfig } = pieChart || {};

  const isLoading =
    pieChartDataLoading || monthlyInventoryValuesLoading || topProductsLoading;

  if (isLoading) return <Spinner size="large" />;

  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="inventory">Inventory</TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        <AnalyticsOverview
          pieChartData={pieChartData}
          pieChartConfig={pieChartConfig}
          lineChartData={monthlyInventoryValues}
        />
      </TabsContent>

      <TabsContent value="inventory">
        <AnalyticsInventory barChartData={topProducts} />
      </TabsContent>
    </Tabs>
  );
}
