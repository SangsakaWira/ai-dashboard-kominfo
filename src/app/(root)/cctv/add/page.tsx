"use client";

import { useCreateCctv } from "@/hooks/cctv";
import { CctvPayload } from "@/schemas";
import { useRouter } from "next/navigation";
import { CctvForm } from "../CctvForm";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/lib/utils";

export default function CreateCctvPage() {
  const { createCctv, isMutating } = useCreateCctv();
  const router = useRouter();

  const handleCreate = async (values: CctvPayload) => {
    const req = createCctv(values);
    
    void toast.promise(req, {
      loading: "Menyimpan data CCTV...",
      success: "Data CCTV berhasil ditambahkan!",
      error: (err) => getApiErrorMessage(err),
    });

    await req
    router.push("/cctv");
    // try {
    // } catch (error) {
    //   console.error(error)
    // }
  };

  return (
    <div className="max-w-5xl">
      <h1 className="text-xl font-semibold mb-4">Create CCTV</h1>

      <CctvForm
        onSubmit={handleCreate}
        isMutating={isMutating}
        defaultValues={{
          name: "",
          is_active: true,
          latitude: undefined,
          longitude: undefined,
          status: "normal",
          category: "",
          stream_url: "",
          location_name: "",
        }}
        mode="create"
      />
    </div>
  );
}
