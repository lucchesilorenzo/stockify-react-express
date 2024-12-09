import { Product } from "@stockify/backend/types";
import { Package } from "lucide-react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TProductEditFormSchema } from "@/lib/validations/product-validations";

type ProductEditFormDetailsProps = {
  product: Product;
  register: UseFormRegister<TProductEditFormSchema>;
  errors: FieldErrors<TProductEditFormSchema>;
};

export default function ProductEditFormDetails({
  product,
  register,
  errors,
}: ProductEditFormDetailsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          <span className="text-xl">Product Details</span>
        </CardTitle>
        <CardDescription>Update your product details.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              className="w-full"
              defaultValue={product.name}
              disabled
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              defaultValue={product.description ?? ""}
              spellCheck={false}
              placeholder="Add a description of your product"
              className="min-h-32"
              {...register("description")}
            />
            {errors.description && (
              <p className="px-1 text-sm text-red-600">
                {errors.description.message}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
