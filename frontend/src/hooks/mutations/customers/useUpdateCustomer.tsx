import { updateData } from "@/lib/api-client";
import { TCustomerEditFormSchema } from "@/lib/validations/customer-validations";
import { Customer } from "@stockify/backend/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type UpdateCustomer = {
  data: TCustomerEditFormSchema;
  customerId: Customer["id"];
};

export function useUpdateCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data, customerId }: UpdateCustomer) =>
      updateData(`/customers/${customerId}`, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      toast.success(response.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
