"use client"
import { useCreateFloodReport } from "@/hooks/flood-report";
import { useAllLocation } from "@/hooks/locations";
import { FloodSpotPayload } from "@/types";
import { useRouter } from "next/navigation";
import { SpotForm } from "../SpotForm";
import { useCreateFloodSpot } from "@/hooks/flood-spot";
import { SpotPayload } from "@/schemas";

export default function AddSpotPage() {
  const locations = useAllLocation();
  const { createFloodSpot, isMutating } = useCreateFloodSpot()
  const router = useRouter()

  const handleCreate = async (payload: SpotPayload) => {
    await createFloodSpot(payload)
    router.push("/flood-spot")
  };

  return (
    <div className="max-w-5xl">
      <h1 className="text-xl font-semibold mb-4">Create Spot</h1>

      <SpotForm
        onSubmit={handleCreate}
        locations={locations?.data || []}
        isMutating={isMutating}
        defaultValues={{
          latitude: "",
          longitude: "",
          location_id: undefined,
          severity: "",
          depth: undefined,
          description: "",
          source: "",
        }}
        mode="create"
      />
    </div>
  );
}
