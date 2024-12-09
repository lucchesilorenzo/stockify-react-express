import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/lib/api-client";
import { Product } from "@stockify/backend/types";

export function useProductsToRestock() {
  return useQuery({
    queryKey: ["products-to-restock"],
    queryFn: (): Promise<Product[]> => fetchData("/products/to-restock"),
  });
}
