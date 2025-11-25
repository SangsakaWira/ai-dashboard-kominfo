import { FloodReport, FloodReportPayload } from "@/types";
import { useApi } from "../useApi";
import { floodReportService } from "@/services/api.service";
import { useApiMutation } from "../useApiMutation";
import { mutate } from "swr";

export const useFloodReport = (params?: {
  page?: number;
  limit?: number;
  sort?: string;
  status?: "pending" | "verified" | "rejected" | "resolved";
  source?: string;
  location_id?: number;
}) => useApi<FloodReport[]>(floodReportService.list, params);

export const useFloodReportDetail = (id?: number) => {
  return useApi<FloodReport>(id ? floodReportService.detail(id) : null);
};

export const useCreateFloodReport = () => {
  const { trigger, data, error, isMutating } =
    useApiMutation<FloodReport>(floodReportService.create);

  const createFloodReport = async (payload: FloodReportPayload) => {
    const result = await trigger({
      method: "POST",
      data: payload,
    });

    mutate(floodReportService.list);

    return result;
  };

  return { createFloodReport, data, error, isMutating };
};

export const useUpdateFloodReport = (id: number) => {
  const { trigger, data, error, isMutating } =
    useApiMutation<FloodReport>(floodReportService.update(id));

  const updateFloodReport = async (payload: FloodReportPayload) => {
    const result = await trigger({
      method: "PATCH",
      data: payload,
    });

    mutate(floodReportService.list);
    mutate(floodReportService.detail(id));

    return result;
  };

  return { updateFloodReport, data, error, isMutating };
};