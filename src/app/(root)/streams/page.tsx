"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAllCctv, useCctvDetail } from "@/hooks/cctv";
import { Video } from "lucide-react";
import Link from "next/link";
import React from "react";
import { MainPlayer } from "./MainPlayer";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {};

export default function StreamsPage({}: Props) {
  const [selectedCamera, setSelectedCamera] = React.useState("");

//   const getCameraStatusBadge = (status: string) => {
//     return status === "online" ? (
//       <Badge className="bg-green-500">Online</Badge>
//     ) : (
//       <Badge variant="destructive">Offline</Badge>
//     );
//   };

  const getCameraStatusBadge = (isActive?: boolean) => {
  return isActive ? (
    <Badge className="bg-green-500">Aktif</Badge>
  ) : (
    <Badge variant="destructive">Tidak Aktif</Badge>
  );
};

  const { data: all, isLoading: allLoading } = useAllCctv();
  const { data: selected, isLoading: selectedLoading } = useCctvDetail(
    Number(selectedCamera)
  );

  return (
    <div>
      <div className="grid grid-cols-1 gap-6">
        <Card className="bg-card border">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Video className="mr-2 h-5 w-5" />
                CCTV Live Streams
              </div>
              <div className="flex items-center space-x-2">
                <select
                  className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm"
                  value={selectedCamera}
                  onChange={(e) => setSelectedCamera(e.target.value)}
                >
                  {all?.map((camera) => (
                    <option key={camera.id} value={camera.id.toString()}>
                      {camera.name}
                    </option>
                  ))}
                </select>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Main Stream */}
              <MainPlayer
                selected={selected}
                selectedLoading={selectedLoading}
              />

              {/* Camera Grid */}
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between text-lg">
                  <h3 className="font-semibold mb-4">Semua Kamera</h3>
                  <Link href={"/cctv"}>
                    <Button variant={"link"}>Manage CCTV</Button>
                  </Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {allLoading ? (
                    <>
                      {Array.from({ length: 6 }).map((_, i) => (
                        <Skeleton className="h-[150px] w-full" />
                      ))}
                    </>
                  ) : all ? (
                    all.map((camera: any) => (
                      <div
                        key={camera.id}
                        className={`relative bg-gray-900 rounded-lg overflow-hidden cursor-pointer transition-all ${
                          selectedCamera === camera.id.toString()
                            ? "ring-2 ring-primary"
                            : "hover:ring-1 ring-gray-400"
                        }`}
                        onClick={() => setSelectedCamera(camera.id.toString())}
                      >
                        <div className="aspect-video w-full bg-black relative">
                          {camera.thumbnail ? (
                            <img
                              src={camera.thumbnail}
                              alt={camera.name}
                              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full text-white/70">
                              <Video className="h-10 w-10 opacity-40 mb-1" />
                            </div>
                          )}

                          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60" />
                        </div>
                        {/* <div className="absolute top-2 right-2">
                          {getCameraStatusBadge(camera.status)}
                        </div> */}
                        <div className="absolute top-2 right-2">
                        {getCameraStatusBadge(camera.is_active)}
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 px-3 pt-1 pb-2 bg-black/40 backdrop-blur-sm">
                          <p className="text-white text-sm font-semibold truncate">
                            {camera.name}
                          </p>

                          <div className="flex items-center justify-between mt-2 mb-1">
                            <span className="text-[11px] text-gray-300 bg-white/10 px-2 py-[2px] rounded-full backdrop-blur-sm truncate">
                              {camera.location_name}
                            </span>

                            <span className="text-[10px] text-gray-300 bg-white/5 px-2 py-[2px] rounded-md border border-white/10">
                              {camera.category.replace("-", " ").toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No data found..</p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
