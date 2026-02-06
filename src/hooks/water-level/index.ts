import { WaterLevel } from "@/types";
import { useApi } from "../useApi";

export const useWaterLevel = (
  params: { location: string } | null,
  endpoint: string | null
) => useApi<WaterLevel>(endpoint, params ?? undefined);
