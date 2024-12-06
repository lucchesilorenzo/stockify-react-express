import {
  CartesianGrid,
  Line,
  LineChart,
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

type AnalyticsOverviewLineChartProps = {
  lineChartData: {
    month: string;
    value: number;
  }[];
};

export default function AnalyticsOverviewLineChart({
  lineChartData,
}: AnalyticsOverviewLineChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Inventory Value</CardTitle>
        <CardDescription>
          Monthly breakdown of your inventory value.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!lineChartData.length ? (
          <p className="text-center">No results.</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <ChartContainer config={chartConfig}>
              <LineChart
                accessibilityLayer
                data={lineChartData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <YAxis />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Line
                  dataKey="value"
                  type="bump"
                  stroke="var(--color-value)"
                  strokeWidth={2}
                  dot={{
                    fill: "var(--color-value)",
                  }}
                  activeDot={{
                    r: 6,
                  }}
                />
              </LineChart>
            </ChartContainer>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
