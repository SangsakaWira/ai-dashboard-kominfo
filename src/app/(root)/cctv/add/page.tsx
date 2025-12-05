"use client";

import { useCreateCctv } from "@/hooks/cctv";
import { CctvPayload } from "@/schemas";
import { useRouter } from "next/navigation";
import { CctvForm } from "../CctvForm";
import { toast } from "sonner";

export default function CreateCctvPage() {
  const { createCctv, isMutating } = useCreateCctv();
  const router = useRouter();

  const handleCreate = async (values: CctvPayload) => {
    await toast.promise(createCctv(values), {
      loading: "Menyimpan data CCTV...",
      success: "Data CCTV berhasil ditambahkan!",
      error: "Gagal menambahkan CCTV, coba lagi.",
    });
    router.push("/cctv");
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
