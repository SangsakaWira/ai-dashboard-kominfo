import { Sensor, SensorPayload } from "@/types";
import { useApi } from "../useApi";
import { sensorService } from "@/services/api.service";
import { useApiMutation } from "../useApiMutation";
import { mutate } from "swr";

export const useSensors = (params?: {
  page?: number;
  limit?: number;
  sort?: string;
  key?: string;
  name?: string;
  unit?: string;
  is_active?: boolean
  location_id?: number;
}) => useApi<Sensor[]>(sensorService.list, params);

export const useSensorDetail = (id?: number) => {
  return useApi<Sensor>(id ? sensorService.detail(id) : null);
};

export const useCreateSensor = () => {
  const { trigger, data, error, isMutating } =
    useApiMutation<Sensor>(sensorService.create);

  const createSensor = async (payload: SensorPayload) => {
    const result = await trigger({
      method: "POST",
      data: payload,
    });

    mutate(sensorService.list);

    return result;
  };

  return { createSensor, data, error, isMutating };
};

export const useUpdateSensor = (id: number) => {
  const { trigger, data, error, isMutating } =
    useApiMutation<Sensor>(sensorService.update(id));

  const updateSensor = async (payload: SensorPayload) => {
    const result = await trigger({
      method: "PATCH",
      data: payload,
    });

    mutate(sensorService.list);
    mutate(sensorService.detail(id));

    return result;
  };

  return { updateSensor, data, error, isMutating };
};

export const useDeleteSensor = (id: number) => {
  const { trigger, data, error, isMutating } =
    useApiMutation<Sensor>(sensorService.delete(id));

  const deleteSensor = async () => {
    const result = await trigger({
      method: "DELETE"
    });

    mutate(sensorService.list);

    return result;
  };

  return { deleteSensor, data, error, isMutating };
};