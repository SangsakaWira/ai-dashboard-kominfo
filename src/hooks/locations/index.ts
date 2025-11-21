import { Location } from "@/types";
import { useApi } from "../useApi";
import { locationService } from "@/services/api.service";

export const useAllLocation = (params?: {
  page?: number;
  limit?: number;
  sort?: string;
  name: string | null;
  zone_type?: string;
}) => useApi<Location[]>(locationService.list, params);