"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAllCctv } from "@/hooks/cctv";
import {
  Maximize,
  Pause,
  Play,
  RotateCcw,
  Video,
  Volume2,
  VolumeX,
} from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {};

export default function StreamsPage({}: Props) {
  const [selectedCamera, setSelectedCamera] = React.useState("");
  const [cctvPlaying, setCctvPlaying] = React.useState(true);
  const [cctvMuted, setCctvMuted] = React.useState(false);

  const getCameraStatusBadge = (status: string) => {
    return status === "online" ? (
      <Badge className="bg-green-500">Online</Badge>
    ) : (
      <Badge variant="destructive">Offline</Badge>
    );
  };

  const { data: all, isLoading: allLoading } = useAllCctv();
  const { data: selected, isLoading: selectedLoading } = useAllCctv(
    selectedCamera.length !== 0 ? { name: selectedCamera } : undefined
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
                  {all?.map((camera:any) => (
                    <option key={camera.id} value={camera.name}>
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
              <div className="lg:col-span-2">
                <div className="relative bg-black rounded-lg overflow-hidden">
                  <div className="aspect-video bg-gray-900 flex items-center justify-center">
                    {/* <iframe width="620" height="350" src="https://www.youtube.com/embed/3gjO-Ifaig0" title="APACE - 22.033.11K" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> */}
                    {selectedLoading ? (
                      <p>Loading video...</p>
                    ) : selected ? (
                      <iframe
                        src={selected[0].stream_url}
                        width="100%"
                        height="100%"
                        style={{ border: "none" }}
                        allowFullScreen
                      />
                    ) : (
                      <p>Pilih CCTV untuk menampilkan video</p>
                    )}
                  </div>

                  {/* Stream Controls */}
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-white hover:bg-white/20"
                          onClick={() => setCctvPlaying(!cctvPlaying)}
                        >
                          {cctvPlaying ? (
                            <Pause className="h-4 w-4" />
                          ) : (
                            <Play className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-white hover:bg-white/20"
                          onClick={() => setCctvMuted(!cctvMuted)}
                        >
                          {cctvMuted ? (
                            <VolumeX className="h-4 w-4" />
                          ) : (
                            <Volume2 className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-white hover:bg-white/20"
                        >
                          <RotateCcw className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-white text-sm">
                          {new Date().toLocaleTimeString()}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-white hover:bg-white/20"
                        >
                          <Maximize className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Camera Grid */}
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold mb-4">Semua Kamera</h3>
                  <Link href={"/cctv"}>
                    <Button variant={"link"}>Manage CCTV</Button>
                  </Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {all?.map((camera:any) => (
                    <div
                      key={camera.id}
                      className={`relative bg-gray-900 rounded-lg overflow-hidden cursor-pointer transition-all ${
                        selectedCamera === camera.name
                          ? "ring-2 ring-primary"
                          : "hover:ring-1 ring-gray-400"
                      }`}
                      onClick={() => setSelectedCamera(camera.name)}
                    >
                      <div className="aspect-video bg-gray-800 flex items-center justify-center">
                        <div className="text-center text-white">
                          <Video className="h-8 w-8 mx-auto mb-2 opacity-50" />
                          <p className="text-xs opacity-75">
                            {camera.name.split(" - ")[0]}
                          </p>
                        </div>
                        {/* {camera.} */}
                      </div>
                      <div className="absolute top-2 right-2">
                        {getCameraStatusBadge(camera.status)}
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2">
                        <p className="text-white text-xs truncate">
                          {camera.name.split(" - ")[1]}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
