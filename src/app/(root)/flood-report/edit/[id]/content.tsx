"use client"
import { useCreateFloodReport, useFloodReportDetail, useUpdateFloodReport } from "@/hooks/flood-report";
import { useAllLocation } from "@/hooks/locations";
import { FloodReportPayload } from "@/types";
import { useRouter } from "next/navigation";
import { ReportForm } from "../../ReportForm";

type Props = {
    id: string
}

export function EditReportContent({id}: Props) {
  const locations = useAllLocation();
  const {data: report} = useFloodReportDetail(Number(id))
  const {updateFloodReport,isMutating} = useUpdateFloodReport(Number(id))
  const router = useRouter()

  const handleUpdate = async (payload: FloodReportPayload) => {
    await updateFloodReport(payload)
    router.push("/flood-report")
  };

  if (!report) return <p>Loading...</p>

  return (
    <div className="max-w-5xl">
      <h1 className="text-xl font-semibold mb-4">Edit Report</h1>

      <ReportForm
        onSubmit={handleUpdate}
        locations={locations?.data || []}
        isMutating={isMutating}
        defaultValues={{
          latitude: report.latitude,
          longitude: report.longitude,
          location_id: report.location_id,
          reporter_name: report.reporter_name,
          reporter_phone: report.reporter_phone,
          description: report.description,
          photo_url: report.photo_url,
          source: report.source,
        }}
        mode="edit"
      />
    </div>
  );
}
