"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { LoadingButton } from "../common/loading-button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useOrder } from "@/hooks/useOrder";
import { useProduct } from "@/hooks/useProduct";
import {
  TOrderFormSchema,
  orderFormSchema,
} from "@/lib/validations/order-validations";

type OrderFormProps = {
  onFormSubmit: () => void;
};

export default function OrderForm({ onFormSubmit }: OrderFormProps) {
  const { categories, warehouses } = useProduct();
  const { suppliers, handleCreateOrder } = useOrder();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<TOrderFormSchema>({
    resolver: zodResolver(orderFormSchema),
  });

  async function onSubmit(data: TOrderFormSchema) {
    await handleCreateOrder(data);
    onFormSubmit();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label htmlFor="name">
              Name <span className="text-red-600">*</span>
            </Label>
            <Input
              id="name"
              placeholder="Enter product name"
              {...register("name")}
            />
            {errors.name && (
              <p className="px-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="categoryId">
              Category <span className="text-red-600">*</span>
            </Label>
            <Select onValueChange={(value) => setValue("categoryId", value)}>
              <SelectTrigger id="categoryId">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name} - Tax: {category.taxRate}%
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.categoryId && (
              <p className="px-1 text-sm text-red-600">
                {errors.categoryId.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-1">
          <Label htmlFor="warehouseId">
            Warehouse <span className="text-red-600">*</span>
          </Label>
          <Select onValueChange={(value) => setValue("warehouseId", value)}>
            <SelectTrigger id="warehouseId">
              <SelectValue placeholder="Select a warehouse" />
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
          <Label htmlFor="price">
            Base price (€) <span className="text-red-600">*</span>
          </Label>
          <Input id="price" placeholder="0.00" {...register("price")} />
          {errors.price && (
            <p className="px-1 text-sm text-red-600">{errors.price.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label htmlFor="quantity">
              Quantity <span className="text-red-600">*</span>
            </Label>
            <Input id="quantity" placeholder="1" {...register("quantity")} />
            {errors.quantity && (
              <p className="px-1 text-sm text-red-600">
                {errors.quantity.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="maxQuantity">
              Max quantity <span className="text-red-600">*</span>
            </Label>
            <Input
              id="maxQuantity"
              placeholder="100"
              {...register("maxQuantity")}
            />
            {errors.maxQuantity && (
              <p className="px-1 text-sm text-red-600">
                {errors.maxQuantity.message}
              </p>
            )}
          </div>
        </div>

        <LoadingButton isLoading={isSubmitting} className="w-full">
          Create
        </LoadingButton>
      </div>
    </form>
  );
}
