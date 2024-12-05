"use client";

import { Category, Product } from "@prisma/client";
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

type ProductEditFormCategorySelectProps = {
  product: Product;
  categories: Category[];
  setValue: UseFormSetValue<TProductEditFormSchema>;
  errors: FieldErrors<TProductEditFormSchema>;
};

export default function ProductEditFormCategorySelect({
  product,
  categories,
  setValue,
  errors,
}: ProductEditFormCategorySelectProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="category">Category Selection</Label>
      <Select
        onValueChange={(value) => setValue("categoryId", value)}
        defaultValue={product.categoryId}
      >
        <SelectTrigger id="category" aria-label="Select category">
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.id}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {errors.categoryId && (
        <p className="px-1 text-sm text-red-600">{errors.categoryId.message}</p>
      )}
    </div>
  );
}
