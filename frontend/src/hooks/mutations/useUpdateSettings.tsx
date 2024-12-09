import { updateData } from "@/lib/api-client";
import { TSettingsFormSchema } from "@/lib/validations/settings-validations";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type UpdateSettings = {
  data: TSettingsFormSchema;
  userId: string;
};

export function useUpdateSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data, userId }: UpdateSettings) =>
      updateData(`/settings/${userId}`, { data }),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success(response.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
