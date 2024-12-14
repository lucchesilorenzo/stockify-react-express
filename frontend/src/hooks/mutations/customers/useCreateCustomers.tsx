import { postData } from "@/lib/api-client";
import { CustomerEssentials } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreateCustomers() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CustomerEssentials[]) => postData("/customers", data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      toast.success(response.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
