import { useQueries } from "@tanstack/react-query";
import { fetchData } from "@/lib/api-client";

export function useDashboardSummaryData() {
  return useQueries({
    queries: [
      {
        queryKey: ["dashboard", "inventory-value"],
        queryFn: (): Promise<number> => fetchData("/dashboard/inventory-value"),
      },
      {
        queryKey: ["dashboard", "low-stock-products"],
        queryFn: (): Promise<number> =>
          fetchData("/dashboard/low-stock-products"),
      },
      {
        queryKey: ["dashboard", "shipped-orders"],
        queryFn: (): Promise<number> => fetchData("/dashboard/shipped-orders"),
      },
      {
        queryKey: ["dashboard", "units-in-stock"],
        queryFn: (): Promise<number> => fetchData("/dashboard/units-in-stock"),
      },
    ],
  });
}
