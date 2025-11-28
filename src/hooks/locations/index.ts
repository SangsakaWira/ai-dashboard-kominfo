import { Location } from "@/types";
import { useApi } from "../useApi";
import { locationService } from "@/services/api.service";
import { useApiMutation } from "../useApiMutation";
import { mutate } from "swr";
import { LocationPayload } from "@/schemas";

export const useAllLocation = (params?: {
  page?: number;
  limit?: number;
  sort?: string;
  name: string | null;
  zone_type?: string;
}) => useApi<Location[]>(locationService.list, params);

export const useLocationDetail = (id?: number) => {
  return useApi<Location>(id ? locationService.detail(id) : null);
};

export const useCreateLocation = () => {
  const { trigger, data, error, isMutating } =
    useApiMutation<Location>(locationService.create);

  const createLocation = async (payload: LocationPayload) => {
    const result = await trigger({
      method: "POST",
      data: payload,
    });

    mutate(locationService.list);

    return result;
  };

  return { createLocation, data, error, isMutating };
};

export const useUpdateLocation = (id: number) => {
  const { trigger, data, error, isMutating } =
    useApiMutation<Location>(locationService.update(id));

  const updateLocation = async (payload: LocationPayload) => {
    const result = await trigger({
      method: "PATCH",
      data: payload,
    });

    mutate(locationService.list);
    mutate(locationService.detail(id));

    return result;
  };

  return { updateLocation, data, error, isMutating };
};