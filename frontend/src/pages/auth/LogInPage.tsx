import AuthFooter from "@/components/auth/AuthFooter";
import AuthForm from "@/components/auth/AuthForm";
import AuthHeading from "@/components/auth/AuthHeading";
import AuthImage from "@/components/auth/AuthImage";

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
