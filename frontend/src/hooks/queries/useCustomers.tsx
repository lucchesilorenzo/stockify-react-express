import { fetchData } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

export function useCustomers() {
  return useQuery({
    queryKey: ["customers"],
    queryFn: () => fetchData("/customers"),
  });
}
