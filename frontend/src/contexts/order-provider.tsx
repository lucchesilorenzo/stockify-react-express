import { createContext } from "react";

import { Supplier } from "@prisma/client";

type OrderProviderProps = {
  children: React.ReactNode;
  suppliers: Supplier[];
};

type TOrderContext = {
  suppliers: Supplier[];
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
