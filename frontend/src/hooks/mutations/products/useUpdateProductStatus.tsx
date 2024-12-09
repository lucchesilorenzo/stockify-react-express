import { updateData } from "@/lib/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Product } from "@stockify/backend/types";

type UpdateProductStatus = {
  productId: Product["id"];
  status: Product["status"];
};

export function useUpdateProductStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, status }: UpdateProductStatus) =>
      updateData(`/products/${productId}/status`, { status }),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success(response.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
