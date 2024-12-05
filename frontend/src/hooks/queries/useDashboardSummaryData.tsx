import { useQueries } from "@tanstack/react-query";
import { fetchData } from "@/lib/api-client";

export function useDashboardSummaryData() {
  return useQueries({
    queries: [
      {
        queryKey: ["dashboard", "inventory-value"],
        queryFn: () => fetchData("/dashboard/inventory-value"),
      },
      {
        queryKey: ["dashboard", "low-stock-products"],
        queryFn: () => fetchData("/dashboard/low-stock-products"),
      },
      {
        queryKey: ["dashboard", "shipped-orders"],
        queryFn: () => fetchData("/dashboard/shipped-orders"),
      },
      {
        queryKey: ["dashboard", "units-in-stock"],
        queryFn: () => fetchData("/dashboard/units-in-stock"),
      },
    ],
  });
}
