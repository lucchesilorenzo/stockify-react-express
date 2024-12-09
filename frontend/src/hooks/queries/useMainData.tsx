import { fetchData } from "@/lib/api-client";
import {
  ProductWithCategoryAndWarehouse,
  SupplierWithOrderCount,
} from "@/lib/types";
import { Category, Warehouse } from "@stockify/backend/types";
import { useQueries } from "@tanstack/react-query";

export function useMainData() {
  return useQueries({
    queries: [
      {
        queryKey: ["products"],
        queryFn: (): Promise<ProductWithCategoryAndWarehouse[]> =>
          fetchData("/products"),
      },
      {
        queryKey: ["categories"],
        queryFn: (): Promise<Category[]> => fetchData("/categories"),
      },
      {
        queryKey: ["warehouses"],
        queryFn: (): Promise<Warehouse[]> => fetchData("/warehouses"),
      },
      {
        queryKey: ["suppliers"],
        queryFn: (): Promise<SupplierWithOrderCount[]> =>
          fetchData("/suppliers"),
      },
    ],
  });
}
