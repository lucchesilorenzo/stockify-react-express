import { fetchData } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@stockify/backend/types";

export function useAvailableProducts() {
  return useQuery({
    queryKey: ["available-products"],
    queryFn: (): Promise<Product[]> => fetchData("/products/available"),
  });
}
