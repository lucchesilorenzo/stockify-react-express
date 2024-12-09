import { createContext } from "react";

import { SupplierWithOrderCount } from "@/lib/types";

type OrderProviderProps = {
  children: React.ReactNode;
  suppliers: SupplierWithOrderCount[];
};

type TOrderContext = {
  suppliers: SupplierWithOrderCount[];
};

export const OrderContext = createContext<TOrderContext | null>(null);

export default function OrderProvider({
  children,
  suppliers,
}: OrderProviderProps) {
  return (
    <OrderContext.Provider value={{ suppliers }}>
      {children}
    </OrderContext.Provider>
  );
}
