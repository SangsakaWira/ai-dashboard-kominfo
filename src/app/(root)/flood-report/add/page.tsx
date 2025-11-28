"use client"
import { useCreateFloodReport } from "@/hooks/flood-report";
import { useAllLocation } from "@/hooks/locations";
import { FloodReportPayload } from "@/types";
import { ReportForm } from "../ReportForm";
import { useRouter } from "next/navigation";

export default function AddReportPage() {
  const locations = useAllLocation();
  const { createFloodReport, isMutating } = useCreateFloodReport()
  const router = useRouter()

  const handleCreate = async (payload: FloodReportPayload) => {
    await createFloodReport(payload)
    router.push("/flood-report")
  };

  return (
    <div className="max-w-5xl">
      <h1 className="text-xl font-semibold mb-4">Create Report</h1>

      <ReportForm
        onSubmit={handleCreate}
        locations={locations?.data || []}
        isMutating={isMutating}
        defaultValues={{
          latitude: "",
          longitude: "",
          location_id: undefined,
          reporter_name: "",
          reporter_phone: "",
          description: "",
          photo_url: "",
          source: "",
        }}
        mode="create"
      />
    </div>
  );
}
