import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/lib/api-client";

export function useActivities() {
  return useQuery({
    queryKey: ["activities"],
    queryFn: () => fetchData("/dashboard/activities"),
  });
}
