import { postData } from "@/lib/api-client";
import { TShippingFormSchema } from "@/lib/validations/customer-validations";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreateShipment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TShippingFormSchema) =>
      postData("/customers/shipment", data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      toast.success(response.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
