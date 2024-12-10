import AuthFooter from "@/components/auth/AuthFooter";
import AuthForm from "@/components/auth/AuthForm";
import AuthHeading from "@/components/auth/AuthHeading";
import AuthImage from "@/components/auth/AuthImage";
import { useEffect } from "react";

export default function SignUpPage() {
  useEffect(() => {
    document.title = "Sign Up | Stockify";
  }, []);

  return (
    <>
      <AuthImage />

      <div className="flex min-h-screen items-center justify-center">
        <div className="grid w-[350px] gap-6">
          <AuthHeading authType="signup" />
          <AuthForm authType="signup" />
          <AuthFooter authType="signup" />
        </div>
      </div>
    </>
  );
}
