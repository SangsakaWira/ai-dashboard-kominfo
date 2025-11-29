import { FloodSpot } from "@/types";
import { useApi } from "../useApi";
import { floodSpotService } from "@/services/api.service";
import { useApiMutation } from "../useApiMutation";
import { mutate } from "swr";
import { SpotPayload } from "@/schemas";

export const useFloodSpot = (params?: {
  page?: number;
  limit?: number;
  sort?: string;
  severity?: "ringan" | "sedang" | "parah";
  source?: "masyarakat" | "petugas" | "sensor_auto"
  location_id?: number;
}) => useApi<FloodSpot[]>(floodSpotService.list, params);

export const useFloodSpotDetail = (id?: number) => {
  return useApi<FloodSpot>(id ? floodSpotService.detail(id) : null);
};

export const useCreateFloodSpot = () => {
  const { trigger, data, error, isMutating } =
    useApiMutation<FloodSpot>(floodSpotService.create);

  const createFloodSpot = async (payload: SpotPayload) => {
    const result = await trigger({
      method: "POST",
      data: payload,
    });

    mutate(floodSpotService.list);

    return result;
  };

  return { createFloodSpot, data, error, isMutating };
};

export const useUpdateFloodSpot = (id: number) => {
  const { trigger, data, error, isMutating } =
    useApiMutation<FloodSpot>(floodSpotService.update(id));

  const updateFloodSpot = async (payload: SpotPayload) => {
    const result = await trigger({
      method: "PATCH",
      data: payload,
    });

    mutate(floodSpotService.list);
    mutate(floodSpotService.detail(id));

    return result;
  };

  return { updateFloodSpot, data, error, isMutating };
};