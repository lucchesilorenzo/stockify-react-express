import { Product } from "@stockify/backend/types";
import { Image as ImageIcon, Upload } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { UseFormRegister } from "react-hook-form";
import { TProductEditFormSchema } from "@/lib/validations/product-validations";
import env from "@/lib/env";

type ProductEditFormImageProps = {
  product: Product;
  register: UseFormRegister<TProductEditFormSchema>;
};

export default function ProductEditFormImage({
  product,
  register,
}: ProductEditFormImageProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImageIcon className="h-5 w-5" />
          <span className="text-xl">Product Image</span>
        </CardTitle>
        <CardDescription>Change the image of your product.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <img
            src={`${env.VITE_BASE_URL}/${product.image}`}
            crossOrigin="anonymous"
            alt="Product image"
            width="300"
            height="300"
            className="w-full rounded-md border object-cover"
          />
          <div className="flex aspect-square max-h-[80px] w-full">
            <div className="relative flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
              <Input
                type="file"
                id="imageInput"
                {...register("image")}
                accept="image/*"
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              />
              <Upload className="h-4 w-4 text-muted-foreground" />
              <span className="sr-only">Upload</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
