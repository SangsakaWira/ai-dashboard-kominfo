import { WaterLevel } from "@/types";
import { useApi } from "../useApi";

export const useWaterLevel = (
  params: {
    location: string;
  },
  endpoint: string
) => useApi<WaterLevel>(endpoint, params);
