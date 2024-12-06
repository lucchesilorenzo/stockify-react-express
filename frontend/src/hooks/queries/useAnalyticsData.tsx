import { useQueries } from "@tanstack/react-query";
import { fetchData } from "@/lib/api-client";

export function useAnalyticsData() {
  return useQueries({
    queries: [
      {
        queryKey: ["analytics", "products-by-category"],
        queryFn: () => fetchData("/analytics/products-by-category"),
      },
      {
        queryKey: ["analytics", "monthly-inventory-values"],
        queryFn: () => fetchData("/analytics/monthly-inventory-values"),
      },
      {
        queryKey: ["analytics", "top-products"],
        queryFn: () => fetchData("/analytics/top-products"),
      },
    ],
  });
}
