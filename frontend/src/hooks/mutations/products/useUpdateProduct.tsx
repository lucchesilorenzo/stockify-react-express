import { updateData } from "@/lib/api-client";
import { TProductEditFormSchema } from "@/lib/validations/product-validations";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type UpdateProduct = {
  data: TProductEditFormSchema;
  productId: string;
};

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data, productId }: UpdateProduct) =>
      updateData(`/products/${productId}`, { data }),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success(response.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
