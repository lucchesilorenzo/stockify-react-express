import { fetchData } from "@/lib/api-client";
import { Order } from "@/lib/types";
import { useQueries } from "@tanstack/react-query";

export function useOrders() {
  return useQueries({
    queries: [
      {
        queryKey: ["orders"],
        queryFn: (): Promise<Order[]> => fetchData("/orders"),
      },
      {
        queryKey: ["orders", "monthly"],
        queryFn: () => fetchData("/orders/monthly"),
      },
      {
        queryKey: ["orders", "weekly"],
        queryFn: () => fetchData("/orders/weekly"),
      },
    ],
  });
}
