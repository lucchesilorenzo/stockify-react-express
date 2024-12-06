import { fetchData } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

export function useAvailableProducts() {
  return useQuery({
    queryKey: ["available-products"],
    queryFn: () => fetchData("/products/available"),
  });
}
