import AuthFooter from "@/components/auth/auth-footer";
import AuthForm from "@/components/auth/auth-form";
import AuthHeading from "@/components/auth/auth-heading";
import AuthImage from "@/components/auth/auth-image";

export default function LogInPage() {
  return (
    <>
      <AuthImage />

      <div className="flex min-h-screen items-center justify-center">
        <div className="grid w-[350px] gap-6">
          <AuthHeading authType="login" />
          <AuthForm authType="login" />
          <AuthFooter authType="login" />
        </div>
      </div>
    </>
  );
}
