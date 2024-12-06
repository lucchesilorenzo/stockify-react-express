import { Product, Warehouse } from "@prisma/client";
import { FieldErrors, UseFormSetValue } from "react-hook-form";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TProductEditFormSchema } from "@/lib/validations/product-validations";

type ProductEditFormWarehouseSelectProps = {
  product: Product;
  warehouses: Warehouse[];
  setValue: UseFormSetValue<TProductEditFormSchema>;
  errors: FieldErrors<TProductEditFormSchema>;
};

export default function ProductEditFormWarehouseSelect({
  product,
  warehouses,
  setValue,
  errors,
}: ProductEditFormWarehouseSelectProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="warehouse">Warehouse Selection</Label>
      <Select
        onValueChange={(value) => setValue("warehouseId", value)}
        defaultValue={product.warehouseId}
      >
        <SelectTrigger id="warehouse" aria-label="Select warehouse">
          <SelectValue placeholder="Select warehouse" />
        </SelectTrigger>
        <SelectContent>
          {warehouses.map((warehouse) => (
            <SelectItem key={warehouse.id} value={warehouse.id}>
              {warehouse.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {errors.warehouseId && (
        <p className="px-1 text-sm text-red-600">
          {errors.warehouseId.message}
        </p>
      )}
    </div>
  );
}
