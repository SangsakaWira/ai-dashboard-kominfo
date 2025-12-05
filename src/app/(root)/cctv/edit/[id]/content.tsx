"use client";

import { useCctvDetail, useUpdateCctv } from "@/hooks/cctv";
import { CctvPayload } from "@/schemas";
import { useRouter } from "next/navigation";
import React from "react";
import { CctvForm } from "../../CctvForm";
import { toast } from "sonner";

export function EditCctvContent({ id }: { id: string }) {
  const { data: cctv } = useCctvDetail(Number(id));
  const { updateCctv, isMutating } = useUpdateCctv(Number(id));
  const router = useRouter();

  const handleUpdate = async (values: CctvPayload) => {
    await toast.promise(updateCctv(values), {
      loading: "Menyimpan data CCTV...",
      success: "Data CCTV berhasil diupdate!",
      error: "Gagal edit CCTV, coba lagi.",
    });
    router.push("/cctv");
  };

  if (!cctv) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="max-w-5xl">
      <h1 className="text-xl font-semibold mb-4">Edit CCTV</h1>

      <CctvForm
        onSubmit={handleUpdate}
        isMutating={isMutating}
        defaultValues={{
          is_active: cctv.is_active,
          name: cctv.name,
          latitude: cctv.latitude,
          longitude: cctv.longitude,
          status: cctv.status,
          category: cctv.category,
          stream_url: cctv.stream_url,
          location_name: cctv.location_name,
        }}
        mode="edit"
      />
    </div>
  );
}
