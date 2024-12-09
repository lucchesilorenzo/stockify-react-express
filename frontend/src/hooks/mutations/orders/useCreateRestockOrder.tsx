import { postData } from "@/lib/api-client";
import { TRestockOrderFormSchema } from "@/lib/validations/order-validations";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreateRestockOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TRestockOrderFormSchema) =>
      postData("/orders/restock", data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success(response.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
