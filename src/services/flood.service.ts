import { useApi } from "@/hooks/useApi";
import { FloodReport, FloodSpot } from "@/types";

// Flood Spot

export const useFloodSpot = (params?: {
  page?: number;
  limit?: number;
  sort?: string;
  severity?: "ringan" | "sedang" | "parah";
  source?: string;
  location_id?: number;
}) => useApi<FloodSpot[]>("/flood/spot", params);


// Flood Report


