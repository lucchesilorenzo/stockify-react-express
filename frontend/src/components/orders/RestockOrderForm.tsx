import { zodResolver } from "@hookform/resolvers/zod";
import { Product } from "@stockify/backend/types";
import { useForm } from "react-hook-form";

import { LoadingButton } from "../common/LoadingButton";
import ProductCombobox from "../products/ProductCombobox";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { useCreateRestockOrder } from "@/hooks/mutations/orders/useCreateRestockOrder";
import { useOrder } from "@/hooks/useOrder";
import {
  TRestockOrderFormSchema,
  restockOrderFormSchema,
} from "@/lib/validations/order-validations";

type RestockOrderFormProps = {
  onFormSubmit: () => void;
  products: Product[];
};

export default function RestockOrderForm({
  onFormSubmit,
  products,
}: RestockOrderFormProps) {
  const { suppliers } = useOrder();
  const { mutateAsync: createRestockOrder } = useCreateRestockOrder();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<TRestockOrderFormSchema>({
    resolver: zodResolver(restockOrderFormSchema),
  });

  async function onSubmit(data: TRestockOrderFormSchema) {
    await createRestockOrder(data);
    onFormSubmit();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <div className="space-y-6">
        <div className="text-sm text-green-600">
          Orders exceeding 50,00 € in product value qualify for free shipping.
        </div>

        <div className="flex flex-col space-y-1">
          <Label htmlFor="productId">
            Product <span className="text-red-600">*</span>
          </Label>
          <ProductCombobox
            products={products}
            setValue={setValue}
            fieldName="productId"
          />
          {errors.productId && (
            <p className="px-1 text-sm text-red-600">
              {errors.productId.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="supplierId">
            Supplier <span className="text-red-600">*</span>
          </Label>
          <Select onValueChange={(value) => setValue("supplierId", value)}>
            <SelectTrigger id="supplierId">
              <SelectValue placeholder="Select a supplier" />
            </SelectTrigger>
            <SelectContent>
              {suppliers.map((supplier) => (
                <SelectItem key={supplier.id} value={supplier.id}>
                  {supplier.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.supplierId && (
            <p className="px-1 text-sm text-red-600">
              {errors.supplierId.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="quantity">
            Quantity <span className="text-red-600">*</span>
          </Label>
          <Input
            id="quantity"
            placeholder="Enter quantity"
            {...register("quantity")}
          />
          {errors.quantity && (
            <p className="px-1 text-sm text-red-600">
              {errors.quantity.message}
            </p>
          )}
        </div>

        <LoadingButton isLoading={isSubmitting} className="w-full">
          Create
        </LoadingButton>
      </div>
    </form>
  );
}
