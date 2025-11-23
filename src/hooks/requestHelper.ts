import api from "@/lib/apiRequest";
import { ApiResponse, UploadResponse } from "@/types";


interface RequestParams {
  [key: string]: string | number | boolean | null | undefined;
}

export const getData = async <T>(url: string, params?: RequestParams): Promise<ApiResponse<T>> => {
  const res = await api.get<ApiResponse<T>>(url, { params });
  return res.data;
};

export const createData = async <T>(url: string, data?: any): Promise<ApiResponse<T>> => {
  const res = await api.post<ApiResponse<T>>(url, data);
  return res.data;
};

export const updateData = async <T>(url: string, data?: any): Promise<ApiResponse<T>> => {
  const res = await api.put<ApiResponse<T>>(url, data);
  return res.data;
};

export const updatePatchData = async <T>(url: string, data?: any): Promise<ApiResponse<T>> => {
  const res = await api.patch<ApiResponse<T>>(url, data);
  return res.data;
};

export const deleteData = async <T>(url: string, params?: RequestParams): Promise<ApiResponse<T>> => {
  const res = await api.delete<ApiResponse<T>>(url, { params });
  return res.data;
};

// for upload
export const uploadFile = async (file: File): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await api.post<ApiResponse<string>>(
    "/file-upload/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data as unknown as UploadResponse
};
