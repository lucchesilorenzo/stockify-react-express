import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { LoadingButton } from "../common/LoadingButton";
import EmailInput from "../common/EmailInput";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { PhoneInput } from "../common/PhoneInput";

// import { createSupplierAction } from "@/app/actions/supplier-actions";
import {
  TSupplierFormSchema,
  supplierFormSchema,
} from "@/lib/validations/supplier-validations";

type SupplierFormProps = {
  onFormSubmit: () => void;
};

export default function SupplierForm({ onFormSubmit }: SupplierFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm<TSupplierFormSchema>({
    resolver: zodResolver(supplierFormSchema),
  });

  async function onSubmit(data: TSupplierFormSchema) {
    // const result = await createSupplierAction(data);
    // if (result?.message) {
    //   toast.error(result.message);
    //   return;
    // }
    // onFormSubmit();
    // toast.success("Supplier created successfully.");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <div className="space-y-6">
        <div className="space-y-1">
          <Label htmlFor="name">
            Name <span className="text-red-600">*</span>
          </Label>
          <Input
            id="name"
            placeholder="Enter supplier name"
            {...register("name")}
          />
          {errors.name && (
            <p className="px-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="email">
            Email <span className="text-red-600">*</span>
          </Label>
          <EmailInput
            id="email"
            placeholder="Enter supplier email"
            register={register}
            registerValue="email"
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
            control={control}
            name="phone"
            render={({ field }) => (
              <PhoneInput
                {...field}
                id="phone"
                placeholder="Enter supplier phone"
                autoComplete="tel"
                defaultCountry="IT"
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
            placeholder="Enter supplier address"
            {...register("address")}
          />
          {errors.address && (
            <p className="px-1 text-sm text-red-600">
              {errors.address.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label htmlFor="city">
              City <span className="text-red-600">*</span>
            </Label>
            <Input
              id="city"
              placeholder="Enter supplier city"
              {...register("city")}
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
              placeholder="Enter supplier zip code"
              {...register("zipCode")}
            />
            {errors.zipCode && (
              <p className="px-1 text-sm text-red-600">
                {errors.zipCode.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-1">
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            placeholder="Enter supplier website"
            {...register("website")}
          />
          {errors.website && (
            <p className="px-1 text-sm text-red-600">
              {errors.website.message}
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
