import { useApiMutation } from "@/hooks/useApiMutation";

export const useUploadFile = () => {
  const { trigger, data, error, isMutating } =
    useApiMutation<{ url: string }>("/file-upload/upload");

  const upload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await trigger({
      method: "POST",
      data: formData,
    });

    return res.data;
  };

  return { upload, data, error, isMutating };
};
