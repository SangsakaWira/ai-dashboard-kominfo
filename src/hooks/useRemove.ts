import { mutate } from "swr";
import { useApiMutation } from "./useApiMutation";

export const useRemove = (endpoint: string, id: number) => {
    const { trigger, data, error, isMutating } =
      useApiMutation(`${endpoint}/${id}`);

    const remove = async () => {
      const res = await trigger({
        method: "DELETE",
      });

      mutate((key) => typeof key === "string" && key.startsWith(endpoint));

      return res;
    };

    return { remove, data, error, isMutating };
  };