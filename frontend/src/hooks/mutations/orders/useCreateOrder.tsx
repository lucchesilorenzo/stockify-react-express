import { postData } from "@/lib/api-client";
import { TOrderFormSchema } from "@/lib/validations/order-validations";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TOrderFormSchema) => postData("/orders", data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success(response.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
