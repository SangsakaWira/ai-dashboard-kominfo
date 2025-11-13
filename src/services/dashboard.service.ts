import { useApi } from "@/hooks/useApi";
import { DashboardSummary } from "@/types";

export const useDashboardSummary = () => useApi<DashboardSummary>("/dashboard/summary");