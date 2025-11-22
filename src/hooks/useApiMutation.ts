import useSWRMutation from "swr/mutation";
import { createData, deleteData, updateData, updatePatchData } from "./requestHelper";
import { ApiResponse } from "@/types";

interface MutationArgs {
  method: "POST" | "PUT" | "DELETE" | "PATCH";
  data?: any;
}

async function mutator<T>(url: string, { arg }: { arg: MutationArgs }): Promise<ApiResponse<T>> {
  const { method, data } = arg;

  if (method === "POST") return createData(url, data);
  if (method === "PUT") return updateData(url, data);
  if (method === "PATCH") return updatePatchData(url, data);
  if (method === "DELETE") return deleteData(url);

  throw new Error("Invalid method");
}

export function useApiMutation<T>(endpoint: string) {
  const { trigger, data, error, isMutating } = useSWRMutation<
    ApiResponse<T>,
    Error,
    string,
    MutationArgs
  >(endpoint, mutator);

  return {
    trigger,
    data,
    error,
    isMutating,
  };
}
