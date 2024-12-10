import { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Customer, Product } from "@stockify/backend/types";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { LoadingButton } from "../../common/LoadingButton";
import CustomerInfoCard from "./CustomerInfoCard";
import ProductSelectionCard from "./ProductSelectionCard";

import { useCustomer } from "@/hooks/useCustomer";
import {
  TShippingFormSchema,
  shippingFormSchema,
} from "@/lib/validations/customer-validations";
import { useCreateShipment } from "@/hooks/mutations/customers/useCreateShipment";

type CustomerShipmentFormProps = {
  products: Product[];
  customers: Customer[];
};

export default function CustomerShipmentForm({
  products,
  customers,
}: CustomerShipmentFormProps) {
  const { mutateAsync: createShipment } = useCreateShipment();
  const {
    selectedCustomer,
    handleSelectCustomer,
    setSelectedProductId,
    setSelectedProducts,
  } = useCustomer();

  const selectedCustomerInfo = customers.find(
    (customer) => customer.id === selectedCustomer,
  );

  const {
    handleSubmit,
    control,
    register,
    setValue,
    reset,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<TShippingFormSchema>({
    resolver: zodResolver(shippingFormSchema),
  });

  useEffect(() => {
    if (selectedCustomerInfo) {
      clearErrors();
      setValue("firstName", selectedCustomerInfo.firstName);
      setValue("lastName", selectedCustomerInfo.lastName);
      setValue("email", selectedCustomerInfo.email);
      setValue("phone", selectedCustomerInfo.phone ?? "");
      setValue("address", selectedCustomerInfo.address);
      setValue("city", selectedCustomerInfo.city);
      setValue("zipCode", selectedCustomerInfo.zipCode);
    }
  }, [selectedCustomerInfo, setValue, clearErrors]);

  function handleClearAll() {
    reset();
    handleSelectCustomer(null);
    setSelectedProductId("");
    setSelectedProducts([]);
  }

  async function onSubmit(data: TShippingFormSchema) {
    if (!data.products.length) {
      toast.error("Please select a product.");
      return;
    }

    await createShipment(data);
    handleClearAll();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-6 lg:grid-cols-2"
    >
      <CustomerInfoCard
        customers={customers}
        control={control}
        register={register}
        errors={errors}
        onClearAll={handleClearAll}
      />

      <ProductSelectionCard
        products={products}
        setValue={setValue}
        errors={errors}
      />

      <LoadingButton
        type="submit"
        isLoading={isSubmitting}
        className="lg:ml-auto"
      >
        Confirm Shipment
      </LoadingButton>
    </form>
  );
}
