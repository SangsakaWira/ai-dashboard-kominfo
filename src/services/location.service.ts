import { useApi } from "@/hooks/useApi";
import { Location } from "@/types";

export const useAllLocation = (params?: {
  page?: number;
  limit?: number;
  sort?: string;
  name: string | null;
  zone_type?: string;
}) => useApi<Location[]>("/location", params);