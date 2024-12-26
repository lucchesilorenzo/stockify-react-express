import { createContext, useState } from "react";

import { Customer, Product } from "@stockify/backend/types";

import {
  CustomerSelectedProduct,
  CustomerShipmentWithItems,
} from "@/lib/types";

type CustomerProviderProps = {
  children: React.ReactNode;
};

type TCustomerContext = {
  selectedProducts: CustomerSelectedProduct[];
  selectedCustomerId: Customer["id"] | null;
  selectedProductId: Product["id"];
  selectedShipmentId: CustomerShipmentWithItems["id"] | null;
  setSelectedProducts: (products: CustomerSelectedProduct[]) => void;
  setSelectedProductId: (productId: Product["id"]) => void;
  handleSelectCustomer: (customerId: Customer["id"] | null) => void;
  handleSelectShipment: (
    shipmentId: CustomerShipmentWithItems["id"] | null,
  ) => void;
};

export const CustomerContext = createContext<TCustomerContext | null>(null);

export default function CustomerProvider({ children }: CustomerProviderProps) {
  const [selectedCustomerId, setSelectedCustomerId] = useState<
    Customer["id"] | null
  >(null);
  const [selectedProducts, setSelectedProducts] = useState<
    CustomerSelectedProduct[]
  >([]);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [selectedShipmentId, setSelectedShipmentId] = useState<
    CustomerShipmentWithItems["id"] | null
  >(null);

  function handleSelectCustomer(customerId: Customer["id"] | null) {
    setSelectedCustomerId(customerId);
  }

  function handleSelectShipment(
    shipmentId: CustomerShipmentWithItems["id"] | null,
  ) {
    setSelectedShipmentId(shipmentId);
  }

  return (
    <CustomerContext.Provider
      value={{
        selectedProducts,
        selectedCustomerId,
        selectedProductId,
        selectedShipmentId,
        setSelectedProducts,
        setSelectedProductId,
        handleSelectCustomer,
        handleSelectShipment,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
}
