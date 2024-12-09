import { Customer } from "@stockify/backend/types";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";

import CustomerInfoFormSelect from "./CustomerInfoFormSelect";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import EmailInput from "@/components/common/EmailInput";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PhoneInput } from "@/components/common/PhoneInput";
import { useCustomer } from "@/hooks/useCustomer";
import { TShippingFormSchema } from "@/lib/validations/customer-validations";

type CustomerInfoCardProps = {
  customers: Customer[];
  control: Control<TShippingFormSchema>;
  register: UseFormRegister<TShippingFormSchema>;
  errors: FieldErrors<TShippingFormSchema>;
  onClearAll: () => void;
};

export default function CustomerInfoCard({
  customers,
  control,
  register,
  errors,
  onClearAll,
}: CustomerInfoCardProps) {
  const { selectedCustomer } = useCustomer();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Customer Information</CardTitle>
        <CardDescription>
          Enter the customer&apos;s details
          {customers.length > 0 && (
            <span className="ml-1">or select an existing customer</span>
          )}
          .
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {customers.length > 0 && (
          <CustomerInfoFormSelect
            customers={customers}
            onClearAll={onClearAll}
          />
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1">
            <Label htmlFor="firstName">
              First name <span className="text-red-600">*</span>
            </Label>
            <Input
              id="firstName"
              placeholder="Enter first name"
              autoComplete="given-name"
              readOnly={!!selectedCustomer}
              {...register("firstName")}
            />
            {errors.firstName && (
              <p className="px-1 text-sm text-red-600">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="lastName">
              Last name <span className="text-red-600">*</span>
            </Label>
            <Input
              id="lastName"
              placeholder="Enter last name"
              autoComplete="family-name"
              readOnly={!!selectedCustomer}
              {...register("lastName")}
            />
            {errors.lastName && (
              <p className="px-1 text-sm text-red-600">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-1">
          <Label htmlFor="email">
            Email <span className="text-red-600">*</span>
          </Label>
          <EmailInput<TShippingFormSchema>
            id="email"
            placeholder="Enter email"
            register={register}
            registerValue="email"
            readOnly={!!selectedCustomer}
          />
          {errors.email && (
            <p className="px-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="phone">
            Phone <span className="text-red-600">*</span>
          </Label>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <PhoneInput
                {...field}
                id="phone"
                placeholder="Enter phone number"
                autoComplete="tel"
                defaultCountry="IT"
                readOnly={!!selectedCustomer}
              />
            )}
          />
          {errors.phone && (
            <p className="px-1 text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="address">
            Address <span className="text-red-600">*</span>
          </Label>
          <Input
            id="address"
            placeholder="Enter address"
            autoComplete="street-address"
            {...register("address")}
            readOnly={!!selectedCustomer}
          />
          {errors.address && (
            <p className="px-1 text-sm text-red-600">
              {errors.address.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1">
            <Label htmlFor="city">
              City <span className="text-red-600">*</span>
            </Label>
            <Input
              id="city"
              placeholder="Enter city"
              autoComplete="address-level2"
              {...register("city")}
              readOnly={!!selectedCustomer}
            />
            {errors.city && (
              <p className="px-1 text-sm text-red-600">{errors.city.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="zipCode">
              Zip Code <span className="text-red-600">*</span>
            </Label>
            <Input
              id="zipCode"
              placeholder="Enter zip code"
              autoComplete="postal-code"
              {...register("zipCode")}
              readOnly={!!selectedCustomer}
            />
            {errors.zipCode && (
              <p className="px-1 text-sm text-red-600">
                {errors.zipCode.message}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
