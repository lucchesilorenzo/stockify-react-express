import { useQueries } from "@tanstack/react-query";
import { fetchData } from "@/lib/api-client";

export function useMainData() {
  return useQueries({
    queries: [
      {
        queryKey: ["categories"],
        queryFn: () => fetchData("/categories"),
      },
      {
        queryKey: ["warehouses"],
        queryFn: () => fetchData("/warehouses"),
      },
      {
        queryKey: ["suppliers"],
        queryFn: () => fetchData("/suppliers"),
      },
    ],
  });
}
