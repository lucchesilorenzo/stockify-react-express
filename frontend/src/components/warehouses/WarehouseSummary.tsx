import { Warehouse } from "lucide-react";

import WarehouseCard from "./WarehouseCard";

import { useProduct } from "@/hooks/useProduct";

export default function WarehouseSummary() {
  const { warehouses } = useProduct();

  const warehouseData = warehouses.map((warehouse) => ({
    title: warehouse.name,
    occupancyRate: (warehouse.quantity / warehouse.maxQuantity) * 100,
    location: warehouse.location,
    description: "Occupancy Rate",
    icon: Warehouse,
  }));

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {warehouseData.map((card) => (
        <WarehouseCard key={card.title} card={card} />
      ))}
    </div>
  );
}
