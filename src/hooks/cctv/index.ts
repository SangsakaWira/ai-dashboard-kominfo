import { CCTV, CCTVPayload } from "@/types";
import { useApi } from "../useApi";
import { cctvService } from "@/services/api.service";
import { useApiMutation } from "../useApiMutation";
import { mutate } from "swr";

export const useAllCctv = (params?: {
  page?: number;
  limit?: number;
  sort?: string;
  name: string | null;
  category?: string;
  location_name?: string;
}) => useApi<CCTV[]>(cctvService.list, params);

export const useCctvDetail = (id?: number) => {
  return useApi<CCTV>(id ? cctvService.detail(id) : null);
};

export const useCreateCctv = () => {
  const { trigger, data, error, isMutating } =
    useApiMutation<CCTV>(cctvService.create);

  const createCctv = async (payload: CCTVPayload) => {
    const result = await trigger({
      method: "POST",
      data: payload,
    });

    mutate(cctvService.list);

    return result;
  };

  return { createCctv, data, error, isMutating };
};

export const useUpdateCctv = (id: number) => {
  const { trigger, data, error, isMutating } =
    useApiMutation<CCTV>(cctvService.update(id));

  const updateCctv = async (payload: CCTVPayload) => {
    const result = await trigger({
      method: "PATCH",
      data: payload,
    });

    mutate(cctvService.list);
    mutate(cctvService.detail(id));

    return result;
  };

  return { updateCctv, data, error, isMutating };
};