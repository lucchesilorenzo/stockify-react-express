"use client";

import { useState } from "react";

import { Eye, EyeOff } from "lucide-react";
import { UseFormRegister } from "react-hook-form";

import { Input } from "@/components/ui/input";
import {
  TLogInSchema,
  TSignUpSchema,
} from "@/lib/validations/auth-validations";

type PasswordInputProps = {
  id: string;
  placeholder: string;
  register: UseFormRegister<TSignUpSchema & TLogInSchema>;
  registerValue: "password" | "confirmPassword";
};

export default function PasswordInput({
  id,
  placeholder,
  register,
  registerValue,
}: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  return (
    <div className="relative">
      <Input
        id={id}
        className="pe-9"
        placeholder={placeholder}
        type={isVisible ? "text" : "password"}
        {...register(registerValue)}
      />
      <button
        className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 ring-offset-background transition-shadow hover:text-foreground focus-visible:border focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
        type="button"
        onClick={toggleVisibility}
        aria-label={isVisible ? "Hide password" : "Show password"}
        aria-pressed={isVisible}
        aria-controls="password"
      >
        {isVisible ? (
          <EyeOff size={16} strokeWidth={2} aria-hidden="true" />
        ) : (
          <Eye size={16} strokeWidth={2} aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
