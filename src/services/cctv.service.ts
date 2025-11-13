import { useApi } from "@/hooks/useApi";
import { CCTV } from "@/types";

export const useAllCctv = (params?: {
  page?: number;
  limit?: number;
  sort?: string;
  name: string | null;
  category?: string;
  location_name?: string;
}) => useApi<CCTV[]>("/cctv", params);