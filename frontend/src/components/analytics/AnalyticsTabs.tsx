import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import AnalyticsInventory from "./AnalyticsInventory";
import AnalyticsOverview from "./AnalyticsOverview";

export default function AnalyticsTabs() {
  // TODO: get data
  // const [
  //   { pieChartData, pieChartConfig },
  //   monthlyInventoryValues,
  //   topProducts,
  // ] = await Promise.all([
  //   getProductsByCategory(),
  //   getMonthlyInventoryValues(),
  //   getTopProducts(),
  // ]);

  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="inventory">Inventory</TabsTrigger>
      </TabsList>

      {/* <TabsContent value="overview">
        <AnalyticsOverview
          pieChartData={pieChartData}
          pieChartConfig={pieChartConfig}
          lineChartData={monthlyInventoryValues}
        />
      </TabsContent>

      <TabsContent value="inventory">
        <AnalyticsInventory barChartData={topProducts} />
      </TabsContent> */}
    </Tabs>
  );
}
