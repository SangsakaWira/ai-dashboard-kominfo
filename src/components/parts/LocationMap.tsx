"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { FloodReport, FloodSpot, Sensor } from "@/types";

const markerIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

type Props = {
  // latitude: string;
  // longitude: string;
  data: any;
};

export function LocationMap({ data }: Props) {
  const lat = Number(data.latitude);
  const lng = Number(data.longitude);

  if (!lat || !lng) {
    return (
      <p className="text-muted-foreground text-sm">Tidak ada data lokasi.</p>
    );
  }

  const center: [number, number] = [
    parseFloat(data.latitude),
    parseFloat(data.longitude),
  ];

  return (
    <div className="w-full h-[300px] rounded-lg overflow-hidden border mt-4">
      <MapContainer
        center={center}
        zoom={9}
        scrollWheelZoom={false}
        // className="h-full w-full"
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <Marker
          position={[parseFloat(data.latitude), parseFloat(data.longitude)]}
          icon={markerIcon}
        >
          <Popup>
            <div className="">
              {data?.name && <h4 className="font-semibold text-lg">{data.name}</h4>}
              {data?.status && (
                <div className="flex items-center gap-2 mt-1">
                  <span className={`flex items-center gap-x-1`}>
                    <div
                      className={`w-[10px] h-[10px] rounded-full ${data.status === "danger" ? "bg-red-500" : "bg-green-500"}`}
                    ></div>{" "}
                    {data.status}
                  </span>
                  {/* <span className="text-xs bg-gray-200 px-2 py-[2px] rounded-md">
                    {data.source}
                  </span> */}
                </div>
              )}

              {data?.is_active && (
                <span className={`flex items-center gap-x-1`}>
                  <div
                    className={`w-[10px] h-[10px] rounded-full ${!data.is_active ? "bg-red-500" : "bg-green-500"}`}
                  ></div>{" "}
                  {data.is_active ? "Aktif" : "Tidak Aktif"}
                </span>
              )}

              <div className="text-[13px] mt-2 space-y-1">
                <div className="flex justify-between gap-x-3">
                  <span className="text-gray-500">Lokasi:</span>
                  <span>{`${Number(data.latitude).toFixed(4)}, ${Number(data.longitude).toFixed(4)}`}</span>
                </div>

                {data?.description && (
                  <div className="flex">
                    <span>{data.description}</span>
                  </div>
                )}
              </div>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
