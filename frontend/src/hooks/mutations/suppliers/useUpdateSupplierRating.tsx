import { updateData } from "@/lib/api-client";
import { Supplier } from "@stockify/backend/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type UpdateSupplierRating = {
  supplierId: Supplier["id"];
  rating: number;
};

export function useUpdateSupplierRating() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ supplierId, rating }: UpdateSupplierRating) =>
      updateData(`/suppliers/${supplierId}/rating`, { rating }),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
      toast.success(response.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
