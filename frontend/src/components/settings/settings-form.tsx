"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { LoadingButton } from "../common/loading-button";
import EmailInput from "../ui/email-input";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { PhoneInput } from "../ui/phone-input";
import { Textarea } from "../ui/textarea";
import SettingsDatePicker from "./settings-date-picker";

import { updateSettingsAction } from "@/app/actions/settings-actions";
import { UserSettings } from "@/lib/types";
import {
  TSettingsFormSchema,
  settingsFormSchema,
} from "@/lib/validations/settings-validations";

type SettingsFormProps = {
  userSettings: UserSettings;
};

export default function SettingsForm({ userSettings }: SettingsFormProps) {
  const {
    register,
    setValue,
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<TSettingsFormSchema>({
    resolver: zodResolver(settingsFormSchema),
  });

  async function onSubmit(data: TSettingsFormSchema) {
    const result = await updateSettingsAction(data);
    if (result?.message) {
      toast.error(result?.message);
      return;
    }
    toast.success("Settings updated successfully.");
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex max-w-[500px] flex-col"
    >
      <div className="space-y-6">
        <div className="space-y-1">
          <Label htmlFor="firstName">First name</Label>
          <Input
            defaultValue={userSettings?.firstName ?? ""}
            id="firstName"
            placeholder="John"
            {...register("firstName")}
          />
          {errors.firstName && (
            <p className="px-1 text-sm text-red-600">
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="lastName">Last name</Label>
          <Input
            defaultValue={userSettings?.lastName ?? ""}
            id="lastName"
            placeholder="Doe"
            {...register("lastName")}
          />
          {errors.lastName && (
            <p className="px-1 text-sm text-red-600">
              {errors.lastName.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <EmailInput
            id="email"
            defaultValue={userSettings?.email ?? ""}
            disabled
          />
        </div>

        <div className="flex flex-col space-y-2">
          <Label htmlFor="dateOfBirth">Date of birth</Label>
          <SettingsDatePicker
            defaultValue={userSettings?.dateOfBirth ?? undefined}
            setValue={setValue}
          />
          {errors.dateOfBirth && (
            <p className="px-1 text-sm text-red-600">
              {errors.dateOfBirth.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            placeholder="Tell us a bit about yourself"
            rows={3}
            spellCheck={false}
            defaultValue={userSettings?.bio ?? ""}
            {...register("bio")}
          />
          {errors.bio && (
            <p className="px-1 text-sm text-red-600">{errors.bio.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="phone">Phone</Label>
          <Controller
            defaultValue={userSettings?.phone ?? ""}
            name="phone"
            control={control}
            render={({ field }) => (
              <PhoneInput
                {...field}
                id="phone"
                placeholder="330 123 4567"
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
          <Label htmlFor="address">Address</Label>
          <Input
            defaultValue={userSettings?.address ?? ""}
            id="address"
            autoComplete="address-line1"
            placeholder="123 Main St."
            {...register("address")}
          />
          {errors.address && (
            <p className="px-1 text-sm text-red-600">
              {errors.address.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="city">City</Label>
          <Input
            defaultValue={userSettings?.city ?? ""}
            id="city"
            placeholder="San Francisco, CA"
            {...register("city")}
          />
          {errors.city && (
            <p className="px-1 text-sm text-red-600">{errors.city.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="zipCode">Zip Code</Label>
          <Input
            defaultValue={userSettings?.zipCode ?? ""}
            id="zipCode"
            placeholder="94105"
            {...register("zipCode")}
          />
          {errors.zipCode && (
            <p className="px-1 text-sm text-red-600">
              {errors.zipCode.message}
            </p>
          )}
        </div>

        <LoadingButton isLoading={isSubmitting}>Update account</LoadingButton>
      </div>
    </form>
  );
}
