"use client";

import { Category } from "@prisma/client";

import AnalyticsOverviewLineChart from "./analytics-overview-line-chart";
import AnalyticsOverviewPieChart from "./analytics-overview-pie-chart";

import { ChartConfig } from "@/components/ui/chart";

type AnalyticsOverviewProps = {
  pieChartData: {
    category: Category["name"];
    units: number;
    fill: string;
  }[];
  pieChartConfig: ChartConfig;
  lineChartData: {
    month: string;
    value: number;
  }[];
};

export default function AnalyticsOverview({
  pieChartData,
  pieChartConfig,
  lineChartData,
}: AnalyticsOverviewProps) {
  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
      <AnalyticsOverviewPieChart
        pieChartData={pieChartData}
        pieChartConfig={pieChartConfig}
      />

      <AnalyticsOverviewLineChart lineChartData={lineChartData} />
    </div>
  );
}
