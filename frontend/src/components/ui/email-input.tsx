import { Mail } from "lucide-react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

import { Input } from "@/components/ui/input";

type EmailInputProps<T extends FieldValues> = {
  id: string;
  placeholder?: string;
  register?: UseFormRegister<T>;
  registerValue?: Path<T>;
  defaultValue?: string;
  disabled?: boolean;
  readOnly?: boolean;
};

export default function EmailInput<T extends FieldValues>({
  id,
  placeholder,
  register,
  registerValue,
  defaultValue = "",
  disabled = false,
  readOnly = false,
}: EmailInputProps<T>) {
  return (
    <div className="relative">
      <Input
        id={id}
        defaultValue={defaultValue}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        autoComplete="email"
        className="peer pe-9"
        {...(register && registerValue ? register(registerValue) : {})}
      />
      <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
        <Mail size={16} strokeWidth={2} aria-hidden="true" />
      </div>
    </div>
  );
}
