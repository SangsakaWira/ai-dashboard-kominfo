"use client";
import { useFloodReportDetail } from "@/hooks/flood-report";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { DetailTitle } from "@/components/parts/DetailTitle";
import dynamic from "next/dynamic";
import { formatDateTime, isValidLatLng } from "@/lib/utils";
import {
  CalendarDaysIcon,
  MapPinIcon,
  PhoneIcon,
  UserIcon,
} from "lucide-react";
import { LocationNotValid } from "@/components/parts/LocationNotValid";

const LocationMap = dynamic(() => import("@/components/parts/LocationMap"), {
  ssr: false,
});

type Props = {
  id: string;
};

export function DetailFloodReportContent({ id }: Props) {
  const { data: report } = useFloodReportDetail(Number(id));
  const showMap = isValidLatLng(report?.latitude, report?.longitude);

  if (!report) return <p>Loading...</p>;
  return (
    <div className="">
      <DetailTitle backUrl="/flood-report" title="Kembali ke Daftar Report" />
      {/* <CardHeader>
      </CardHeader> */}
      <div>
        <div className="space-y-6 mt-10">
          <div className="flex flex-col gap-6">
            {report?.photo_url && (
              <Image
                src={report.photo_url}
                alt={report.description}
                width={800}
                height={800}
                className="w-auto h-[450px] 2xl:h-[550px] object-fill rounded-lg"
              />
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="md:col-span-2">
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-semibold">{report.name}</h2>

                    <div className="my-5">
                      <div className="flex items-center gap-x-2">
                        <MapPinIcon size={18} />
                        <h3 className="font-semibold">Lokasi Kejadian</h3>
                      </div>
                      {showMap ? <LocationMap data={report} /> : <LocationNotValid />}
                    </div>

                    <div>
                      <p className="mb-2 text-xs text-muted-foreground">
                        Deskripsi
                      </p>
                      <p className="font-semibold">{report.description}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                      <div className="mt-4">
                        <div className="flex flex-col">
                          <p className="text-xs text-muted-foreground">
                            Kedalaman
                          </p>
                          <p className="font-semibold">
                            {report.depth} cm/
                            {report.depth_label}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="flex flex-col">
                          <p className="text-xs text-muted-foreground">
                            Sumber
                          </p>
                          <p className="font-semibold">{report.source}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="md:col-span-1">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-base font-semibold">
                      Informasi Laporan
                    </div>

                    <div className="mt-4 space-y-2">
                      <div className="flex items-center gap-x-4 border-b py-3">
                        <UserIcon size={18} />
                        <div className="flex flex-col">
                          <p className="text-xs text-muted-foreground">
                            Nama Pelapor
                          </p>
                          <p className="font-semibold">
                            {report.reporter_name}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-x-4 border-b py-3">
                        <PhoneIcon size={18} />
                        <div className="flex flex-col">
                          <p className="text-xs text-muted-foreground">
                            No Telepon Pelapor
                          </p>
                          <p className="font-semibold">
                            {report.reporter_phone}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-x-4 border-b py-3">
                        <CalendarDaysIcon size={18} />
                        <div className="flex flex-col">
                          <p className="text-xs text-muted-foreground">
                            Waktu Laporan
                          </p>
                          <p className="font-semibold">
                            {formatDateTime(report.created_at)} WIB
                          </p>
                        </div>
                      </div>

                      <div className="!mt-4 flex flex-col items-start gap-y-2">
                        <p className="text-xs text-muted-foreground">Status</p>
                        <Badge
                          className={`capitalize 
                            ${
                              report.status === "pending"
                                ? "bg-yellow-500"
                                : report.status === "verified"
                                  ? "bg-green-600"
                                  : "bg-red-600"
                            }
                          `}
                        >
                          {report.status}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
