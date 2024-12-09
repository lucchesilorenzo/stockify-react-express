import { fetchData } from "@/lib/api-client";
import { UserSettings } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export function useSettings() {
  return useQuery({
    queryKey: ["settings"],
    queryFn: (): Promise<UserSettings> =>
      fetchData("/settings/cm466qyf100004ov2f62p5gm6"),
  });
}
