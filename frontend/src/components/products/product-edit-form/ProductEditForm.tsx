import { zodResolver } from "@hookform/resolvers/zod";
import { Product } from "@stockify/backend/types";
import { ChevronLeft, Save, X } from "lucide-react";
import { useForm } from "react-hook-form";

import ProductEditFormDetails from "./ProductEditFormDetails";
import ProductEditFormImage from "./ProductEditFormImage";
import ProductEditFormStockDetails from "./ProductEditFormStockAndPrice";

import H1 from "@/components/common/H1";
import { LoadingButton } from "@/components/common/LoadingButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useUpdateProduct } from "@/hooks/mutations/products/useUpdateProduct";
import { useProduct } from "@/hooks/useProduct";
import { STATUS_CONFIG } from "@/lib/constants";
import {
  TProductEditFormSchema,
  productEditFormSchema,
} from "@/lib/validations/product-validations";
import { Link } from "react-router-dom";
import ProductEditFormSelection from "./ProductEditFormSelection";
import { toast } from "sonner";

type ProductEditFormProps = {
  product: Product;
};

export default function ProductEditForm({ product }: ProductEditFormProps) {
  const { mutateAsync: updateProduct } = useUpdateProduct();
  const { categories, warehouses } = useProduct();

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<TProductEditFormSchema>({
    resolver: zodResolver(productEditFormSchema),
  });

  async function onSubmit(data: TProductEditFormSchema) {
    console.log(data);
    // Upload image if it exists
    const file = data.image[0] as File;
    if (file) {
      if (!file.type.startsWith("image")) {
        toast.error("Please upload a valid image.");
        return;
      }
    }

    await updateProduct({ data, productId: product.id });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto grid max-w-7xl flex-1 auto-rows-max gap-4"
    >
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" className="h-7 w-7" asChild>
          <Link to="/app/products">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <H1>{product.name}</H1>
        <Badge
          variant={STATUS_CONFIG[product.status].variant}
          className="ml-auto sm:ml-0"
        >
          {STATUS_CONFIG[product.status].label}
        </Badge>

        <div className="hidden items-center gap-2 md:ml-auto md:flex">
          <Button type="button" variant="outline" onClick={() => reset()}>
            <X className="mr-2 h-4 w-4" />
            Discard
          </Button>
          <LoadingButton type="submit" isLoading={isSubmitting}>
            <Save className="mr-2 h-4 w-4" />
            Save Product
          </LoadingButton>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
        <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
          <ProductEditFormDetails
            product={product}
            register={register}
            errors={errors}
          />

          <ProductEditFormStockDetails
            product={product}
            register={register}
            errors={errors}
          />

          <ProductEditFormSelection
            product={product}
            warehouses={warehouses}
            categories={categories}
            setValue={setValue}
            errors={errors}
          />
        </div>

        <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
          <ProductEditFormImage product={product} register={register} />
        </div>
      </div>

      {/* Mobile */}
      <div className="flex items-center justify-center gap-2 md:hidden">
        <Button type="button" variant="outline" onClick={() => reset()}>
          <X className="mr-2 h-4 w-4" />
          Discard
        </Button>
        <LoadingButton type="submit" isLoading={isSubmitting}>
          <Save className="mr-2 h-4 w-4" />
          Save Product
        </LoadingButton>
      </div>
    </form>
  );
}
