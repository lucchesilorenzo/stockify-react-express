"use client";

import CustomerViewShipmentsSelect from "./customer-view-shipments-select";
import CustomerViewShipmentsTable from "./customer-view-shipments-table";

import { CustomerShipmentWithItems } from "@/lib/types";

type CustomerViewShipmentsProps = {
  customerShipment: CustomerShipmentWithItems[];
};

export default function CustomerViewShipments({
  customerShipment,
}: CustomerViewShipmentsProps) {
  return (
    <div className="space-y-4">
      <CustomerViewShipmentsSelect customerShipment={customerShipment} />
      <CustomerViewShipmentsTable customerShipment={customerShipment} />
    </div>
  );
}
