import { createContext } from "react";

import { Category, Warehouse } from "@prisma/client";

type ProductProviderProps = {
  children: React.ReactNode;
  categories: Category[];
  warehouses: Warehouse[];
};

type TProductContext = {
  categories: Category[];
  warehouses: Warehouse[];
};

export const ProductContext = createContext<TProductContext | null>(null);

export default function ProductProvider({
  children,
  categories,
  warehouses,
}: ProductProviderProps) {
  return (
    <ProductContext.Provider
      value={{
        categories,
        warehouses,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
