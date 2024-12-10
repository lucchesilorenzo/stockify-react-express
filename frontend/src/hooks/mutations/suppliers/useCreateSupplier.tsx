import { postData } from "@/lib/api-client";
import { TSupplierFormSchema } from "@/lib/validations/supplier-validations";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreateSupplier() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TSupplierFormSchema) => postData("/suppliers", data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
      toast.success(response.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
