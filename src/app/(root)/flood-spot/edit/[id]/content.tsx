"use client"
import { useFloodReportDetail, useUpdateFloodReport } from "@/hooks/flood-report";
import { useAllLocation } from "@/hooks/locations";
import { FloodSpotPayload } from "@/types";
import { useRouter } from "next/navigation";
import { SpotForm } from "../../SpotForm";
import { useFloodSpotDetail, useUpdateFloodSpot } from "@/hooks/flood-spot";
import { SpotPayload } from "@/schemas";
import { toast } from "sonner";

type Props = {
    id: string
}

export function EditSpotContent({id}: Props) {
  const locations = useAllLocation();
  const {data: spot} = useFloodSpotDetail(Number(id))
  const {updateFloodSpot,isMutating} = useUpdateFloodSpot(Number(id))
  const router = useRouter()

  const handleUpdate = async (payload: SpotPayload) => {
    await toast.promise(updateFloodSpot(payload), {
      loading: "Menyimpan data Spot...",
      success: "Data Spot berhasil diupdate!",
      error: "Gagal edit Spot, coba lagi.",
    });
    router.push("/flood-spot")
  };

  if (!spot) return <p>Loading...</p>

  return (
    <div className="max-w-5xl">
      <h1 className="text-xl font-semibold mb-4">Edit Spot</h1>

      <SpotForm
        onSubmit={handleUpdate}
        locations={locations?.data || []}
        isMutating={isMutating}
        defaultValues={{
          latitude: spot.latitude,
          longitude: spot.longitude,
          location_id: spot.location_id,
          severity: spot.severity,
          depth: spot.depth ?? undefined,
          description: spot.description,
          source: spot.source,
        }}
        mode="edit"
      />
    </div>
  );
}
