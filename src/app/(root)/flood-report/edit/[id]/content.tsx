"use client"
import { useFloodReportDetail, useUpdateFloodReport, useChangeFloodReportStatus } from "@/hooks/flood-report";
import { useAllLocation } from "@/hooks/locations";
import { useRouter } from "next/navigation";
import { ReportForm } from "../../ReportForm";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/lib/utils";
import { ReportPayload } from "@/schemas";

type Props = {
    id: string
}

export function EditReportContent({id}: Props) {
  const locations = useAllLocation();
  const {data: report} = useFloodReportDetail(Number(id))
  const {updateFloodReport,isMutating} = useUpdateFloodReport(Number(id))
  const {changeStatus, isMutating: isStatusChanging} = useChangeFloodReportStatus(Number(id))
  const router = useRouter()

  const handleStatusChange = async (status: "pending" | "verified" | "rejected" | "resolved") => {
    try {
      const result = await changeStatus(status);
      toast.success(`Status berhasil diubah ke ${status}!`);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.refresh();
    } catch (err: any) {
      toast.error(getApiErrorMessage(err));
    }
  };

  const handleUpdate = async (payload: ReportPayload) => {
    try {
      const result = await updateFloodReport(payload);
      toast.success("Data Report berhasil diupdate!");
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.push("/flood-report");
    } catch (err: any) {
      if (err.response?.data?.errors?.some((e: string) => e.includes("At least one field"))) {
        toast.error(
          "Tidak ada perubahan data yang dideteksi. Silakan ubah minimal satu field."
        );
      } else {
        toast.error(getApiErrorMessage(err));
      }
    }
  };

  if (!report) return <p>Loading...</p>

  return (
    <div className="max-w-5xl">
      <h1 className="text-xl font-semibold mb-4">Edit Report</h1>

      <ReportForm
        onSubmit={handleUpdate}
        onStatusChange={handleStatusChange}
        locations={locations?.data || []}
        isMutating={isMutating}
        isStatusChanging={isStatusChanging}
        defaultValues={{
          latitude: report.latitude,
          longitude: report.longitude,
          location_id: report.location_id,
          reporter_name: report.reporter_name,
          reporter_phone: report.reporter_phone,
          description: report.description,
          photo_url: report.photo_url,
          source: report.source,
          status: report.status as "pending" | "verified" | "rejected" | "resolved" | undefined,
          depth: report.depth
        }}
        mode="edit"
      />
    </div>
  );
}
