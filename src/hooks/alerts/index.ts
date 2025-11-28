import { Alert } from "@/types";
import { useApi } from "../useApi";
import { alertService } from "@/services/api.service";
import { useApiMutation } from "../useApiMutation";
import { mutate } from "swr";

export const useAlerts = (params?: {
  page?: number;
  limit?: number;
  type?: string;
  level?: string;
  title?: string;
}) => useApi<Alert[]>(alertService.list, params);

export const useMarkRead = (id: number) => {
  const { trigger, data, error, isMutating } = useApiMutation<Alert>(
    alertService.update(id)
  );

  const updateRead = async () => {
    const result = await trigger({
      method: "PATCH",
    });

    mutate(
      (key) => typeof key === "string" && key.startsWith(alertService.list)
    );

    return result;
  };

  return { updateRead, data, error, isMutating };
};

export const useRemoveAlert = (id: number) => {
  const { trigger, data, error, isMutating } = useApiMutation<Alert>(
    alertService.delete(id)
  );

  const deleteAlert = async () => {
    const result = await trigger({
      method: "DELETE",
    });

    mutate(
      (key) => typeof key === "string" && key.startsWith(alertService.list)
    );

    return result;
  };

  return { deleteAlert, data, error, isMutating };
};
