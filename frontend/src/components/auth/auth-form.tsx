import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { LoadingButton } from "../common/loading-button";
import EmailInput from "../ui/email-input";
import PasswordInput from "../ui/password-input";

// import { logInAction, signUpAction } from "@/app/actions/auth-actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  TLogInSchema,
  TSignUpSchema,
  logInSchema,
  signUpSchema,
} from "@/lib/validations/auth-validations";

type AuthFormProps = {
  authType: "signup" | "login";
};

export default function AuthForm({ authType }: AuthFormProps) {
  const schema = authType === "signup" ? signUpSchema : logInSchema;

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<TSignUpSchema & TLogInSchema>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: TSignUpSchema & TLogInSchema) {
    // const result =
    //   authType === "signup"
    //     ? await signUpAction(data)
    //     : await logInAction(data);
    // if (result?.message) {
    //   toast.error(result?.message);
    //   return;
    // }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      {authType === "signup" && (
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="firstName">First name</Label>
            <Input
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

          <div className="grid gap-2">
            <Label htmlFor="lastName">Last name</Label>
            <Input id="lastName" placeholder="Doe" {...register("lastName")} />
            {errors.lastName && (
              <p className="px-1 text-sm text-red-600">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>
      )}

      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <EmailInput<TLogInSchema & TSignUpSchema>
          id="email"
          placeholder="johndoe@gmail.com"
          register={register}
          registerValue="email"
        />
        {errors.email && (
          <p className="px-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <PasswordInput
          id="password"
          placeholder="Choose a password"
          register={register}
          registerValue="password"
        />
        {errors.password && (
          <p className="px-1 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      {authType === "signup" && (
        <div className="grid gap-2">
          <Label htmlFor="confirmPassword">Confirm password</Label>
          <PasswordInput
            id="confirmPassword"
            placeholder="Re-enter your password"
            register={register}
            registerValue="confirmPassword"
          />
          {errors.confirmPassword && (
            <p className="px-1 text-sm text-red-600">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
      )}

      <LoadingButton isLoading={isSubmitting} className="w-full">
        {authType === "login" ? "Login" : "Sign up"}
      </LoadingButton>
    </form>
  );
}
