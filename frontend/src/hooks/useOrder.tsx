import { useContext } from "react";

import { OrderContext } from "@/contexts/OrderProvider";

export function useOrder() {
  const context = useContext(OrderContext);

  if (!context) {
    throw new Error("useOrder must be used within a OrderProvider");
  }

  return context;
}
