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

export const useFloodReport = (params?: {
  page?: number;
  limit?: number;
  sort?: string;
  status?: "pending" | "verified" | "rejected" | "resolved";
  source?: string;
  location_id?: number;
}) => useApi<FloodReport[]>("/flood/report", params);
