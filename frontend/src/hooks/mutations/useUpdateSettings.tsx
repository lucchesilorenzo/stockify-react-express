import { updateData } from "@/lib/api-client";
import { TSettingsFormSchema } from "@/lib/validations/settings-validations";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUpdateSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TSettingsFormSchema) => updateData("/settings", data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      toast.success(response.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
