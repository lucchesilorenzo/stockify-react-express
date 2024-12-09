import { updateData } from "@/lib/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type UpdateProduct = {
  formData: FormData;
  productId: string;
};

export function useUpdateProduct({ productSlug }: { productSlug: string }) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ formData, productId }: UpdateProduct) =>
      updateData(`/products/${productId}`, formData),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["product", productSlug] });
      toast.success(response.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
