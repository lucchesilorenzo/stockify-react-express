"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  value: {
    label: "EUR",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

type AnalyticsInventoryTopProductsProps = {
  barChartData: {
    product: string;
    value: number;
  }[];
};

export default function AnalyticsInventoryTopProducts({
  barChartData,
}: AnalyticsInventoryTopProductsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Value Product Units</CardTitle>
        <CardDescription>
          Product units with the highest total value in inventory.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!barChartData.length ? (
          <p className="text-center">No results.</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <ChartContainer config={chartConfig}>
              <BarChart
                data={barChartData}
                layout="vertical"
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="product" type="category" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="value" fill="var(--color-value)" />
              </BarChart>
            </ChartContainer>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
