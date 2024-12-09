import { useQueries } from "@tanstack/react-query";
import { fetchData } from "@/lib/api-client";

export function useAnalyticsData() {
  return useQueries({
    queries: [
      {
        queryKey: ["analytics", "products-by-category"],
        queryFn: (): Promise<{
          pieChartData: {
            category: string;
            units: number;
            fill: string;
          }[];
          pieChartConfig: Record<
            string,
            {
              label: string;
              color: string;
            }
          >;
        }> => fetchData("/analytics/products-by-category"),
      },
      {
        queryKey: ["analytics", "monthly-inventory-values"],
        queryFn: (): Promise<{ month: string; value: number }[]> =>
          fetchData("/analytics/monthly-inventory-values"),
      },
      {
        queryKey: ["analytics", "top-products"],
        queryFn: (): Promise<{ product: string; value: number }[]> =>
          fetchData("/analytics/top-products"),
      },
    ],
  });
}
