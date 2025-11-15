import { useApi } from "@/hooks/useApi";
import { OccupancyChart, OccupancyCurrent, OccupancyZones } from "@/types";

export const useOccupancyCurrent = (cctv_id: number) => useApi<OccupancyCurrent>(`/occupancy/current/${cctv_id}`)

export const useOccupancyZones = () => useApi<OccupancyZones[]>(`/occupancy/zones`)

export const useOccupancyChart = (params: { view: "hourly" | "daily" | "weekly" }) => useApi<OccupancyChart[]>("/occupancy/chart", params)