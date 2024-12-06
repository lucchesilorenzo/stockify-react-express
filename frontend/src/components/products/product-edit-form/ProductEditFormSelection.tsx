import { Category, Product, Warehouse } from "@prisma/client";
import { FieldErrors, UseFormSetValue } from "react-hook-form";

import ProductEditFormCategorySelect from "./ProductEditFormCategorySelect";
import ProductEditFormWarehouseSelect from "./ProductEditFormWarehouseSelect";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TProductEditFormSchema } from "@/lib/validations/product-validations";

type ProductEditFormSelectionProps = {
  product: Product;
  warehouses: Warehouse[];
  categories: Category[];
  setValue: UseFormSetValue<TProductEditFormSchema>;
  errors: FieldErrors<TProductEditFormSchema>;
};

export default function ProductEditFormSelection({
  product,
  warehouses,
  categories,
  setValue,
  errors,
}: ProductEditFormSelectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Category & Warehouse</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <ProductEditFormCategorySelect
            product={product}
            categories={categories}
            setValue={setValue}
            errors={errors}
          />
          <Separator />
          <ProductEditFormWarehouseSelect
            product={product}
            warehouses={warehouses}
            setValue={setValue}
            errors={errors}
          />
        </div>
      </CardContent>
    </Card>
  );
}
