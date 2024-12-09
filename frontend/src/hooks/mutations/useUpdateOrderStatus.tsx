import { updateData } from "@/lib/api-client";
import { Order } from "@stockify/backend/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderId: Order["id"]) =>
      updateData(`/orders/${orderId}/status`),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success(response.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
