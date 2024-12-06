import { format } from "date-fns";

import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCustomer } from "@/hooks/useCustomer";
import { CustomerShipmentWithItems } from "@/lib/types";
import { formatShipmentId } from "@/lib/utils";

type CustomerViewShipmentsSelectProps = {
  customerShipment: CustomerShipmentWithItems[];
};

export default function CustomerViewShipmentsSelect({
  customerShipment,
}: CustomerViewShipmentsSelectProps) {
  const { handleSelectShipment } = useCustomer();

  if (!customerShipment.length) return <p>No shipments found.</p>;

  return (
    <Select onValueChange={(value) => handleSelectShipment(value)}>
      <SelectTrigger id="shipment-select">
        <SelectValue placeholder="Select a shipment" />
      </SelectTrigger>
      <SelectContent>
        <ScrollArea className="max-h-60 overflow-y-auto">
          {customerShipment.map((shipment) => (
            <SelectItem key={shipment.id} value={shipment.id}>
              Shipment # {formatShipmentId(shipment)} -{" "}
              {format(shipment.createdAt, "dd/MM/yyyy")}
            </SelectItem>
          ))}
        </ScrollArea>
      </SelectContent>
    </Select>
  );
}
