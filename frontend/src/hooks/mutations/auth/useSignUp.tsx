import { postData } from "@/lib/api-client";
import { TSignUpSchema } from "@/lib/validations/auth-validations";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function useSignUp() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: TSignUpSchema) => postData("/auth/signup", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      navigate("/app/dashboard");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
