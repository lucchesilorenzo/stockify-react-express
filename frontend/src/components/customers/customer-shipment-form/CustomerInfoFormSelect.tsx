import { Customer } from "@stockify/backend/types";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCustomer } from "@/hooks/useCustomer";
import { Separator } from "@/components/ui/separator";
import CustomerCSVUpload from "./CustomerCSVUpload";

type CustomerInfoFormSelectProps = {
  customers: Customer[];
  onClearAll: () => void;
};

export default function CustomerInfoFormSelect({
  customers,
  onClearAll,
}: CustomerInfoFormSelectProps) {
  const { selectedCustomer, handleSelectCustomer } = useCustomer();

  return (
    <div className="flex items-center gap-x-4">
      {customers.length > 0 && (
        <>
          <Select
            value={selectedCustomer ?? ""}
            onValueChange={(value) => handleSelectCustomer(value)}
          >
            <SelectTrigger id="customer-select" className="w-full">
              <SelectValue placeholder="Select existing customer" />
            </SelectTrigger>
            <SelectContent>
              <ScrollArea className="max-h-60 overflow-y-auto">
                {customers.map((customer) => (
                  <SelectItem key={customer.id} value={customer.id}>
                    {`${customer.firstName} ${customer.lastName} (${customer.email})`}
                  </SelectItem>
                ))}
              </ScrollArea>
            </SelectContent>
          </Select>

          {selectedCustomer && (
            <Button
              onClick={onClearAll}
              variant="outline"
              size="icon"
              className="shrink-0"
            >
              <X className="h-5 w-5" />
            </Button>
          )}

          <Separator orientation="vertical" className="h-10" />
        </>
      )}

      <CustomerCSVUpload />
    </div>
  );
}
