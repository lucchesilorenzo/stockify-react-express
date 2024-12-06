import { Product } from "@prisma/client";
import { FieldErrors, UseFormRegister } from "react-hook-form";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TProductEditFormSchema } from "@/lib/validations/product-validations";

type ProductEditTableProps = {
  product: Product;
  register: UseFormRegister<TProductEditFormSchema>;
  errors: FieldErrors<TProductEditFormSchema>;
};

export default function ProductEditTable({
  product,
  register,
  errors,
}: ProductEditTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead className="w-[200px]">Product</TableHead>
          <TableHead className="w-[150px]">SKU</TableHead>
          <TableHead className="w-[200px]">Max Quantity</TableHead>
          <TableHead className="w-[200px]">Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow className="hover:bg-transparent">
          <TableCell className="font-semibold">{product.name}</TableCell>
          <TableCell>{product.sku}</TableCell>
          <TableCell>
            <div className="space-y-1">
              <Input
                id="maxQuantity"
                defaultValue={product.maxQuantity}
                className="w-full"
                {...register("maxQuantity")}
              />
              {errors.maxQuantity && (
                <p className="px-1 text-sm text-red-600">
                  {errors.maxQuantity.message}
                </p>
              )}
            </div>
          </TableCell>
          <TableCell>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">€</span>
                <Input
                  id="price"
                  defaultValue={product.price}
                  className="w-full"
                  {...register("price")}
                />
              </div>
              {errors.price && (
                <p className="px-1 text-sm text-red-600">
                  {errors.price.message}
                </p>
              )}
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
