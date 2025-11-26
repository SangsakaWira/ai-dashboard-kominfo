import useSWR, { SWRConfiguration } from "swr";
import api from "@/lib/apiRequest";
import qs from "query-string";
import { ApiResponse } from "@/types";

const fetcher = async <T>(url: string): Promise<ApiResponse<T>> => {
  const res = await api.get<ApiResponse<T>>(url);
  return res.data;
};

interface ApiParams {
  [key: string]: string | number | boolean | null | undefined;
}

export function useApi<T>(
  endpoint: string | null,
  params?: ApiParams,
  options?: SWRConfiguration
) {
  const url = endpoint
    ? qs.stringifyUrl(
        { url: endpoint, query: params || {} },
        { skipNull: true }
      )
    : null;

  const { data, error, isLoading, mutate } = useSWR<ApiResponse<T>>(
    url,
    url ? fetcher : null,
    {
      revalidateOnFocus: true,
      shouldRetryOnError: false,
      ...options,
    }
  );

  return {
    response: data,
    data: data?.data,
    meta: data?.meta?.page,
    links: data?.links,
    message: data?.message,
    error,
    isLoading,
    mutate,
  };
}
