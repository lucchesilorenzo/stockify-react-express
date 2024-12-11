import { postData } from "@/lib/api-client";
import { TLogInSchema } from "@/lib/validations/auth-validations";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function useLogIn() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: TLogInSchema) => postData("/auth/login", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      navigate("/app/dashboard");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
