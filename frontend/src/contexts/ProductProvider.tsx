import { createContext } from "react";

import { Category, Warehouse } from "@stockify/backend/types";
import { ProductWithCategoryAndWarehouse } from "@/lib/types";

type ProductProviderProps = {
  children: React.ReactNode;
  products: ProductWithCategoryAndWarehouse[];
  categories: Category[];
  warehouses: Warehouse[];
};

type TProductContext = {
  products: ProductWithCategoryAndWarehouse[];
  categories: Category[];
  warehouses: Warehouse[];
};

export const ProductContext = createContext<TProductContext | null>(null);

export default function ProductProvider({
  children,
  products,
  categories,
  warehouses,
}: ProductProviderProps) {
  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        warehouses,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
