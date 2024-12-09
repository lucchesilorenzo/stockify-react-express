import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/lib/api-client";
import { DashboardActivity } from "@/lib/types";

export function useActivities() {
  return useQuery({
    queryKey: ["activities"],
    queryFn: (): Promise<DashboardActivity[]> =>
      fetchData("/dashboard/activities"),
  });
}
