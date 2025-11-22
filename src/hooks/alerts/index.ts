import { Alert } from "@/types";
import { useApi } from "../useApi";
import { alertService } from "@/services/api.service";

export const useAlerts = (params?: {
    page?: number
    limit?: number
}) => useApi<Alert[]>(alertService.list, params)
