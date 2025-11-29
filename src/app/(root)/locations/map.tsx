'use client'

import { CCTV, Location } from "@/types";
import { LatLngExpression } from "leaflet";
import dynamic from "next/dynamic";
import React from "react";

type Props = {
    data: CCTV[]
    isLoading: boolean
};

export function LocationsMap({data,isLoading}: Props) {
  const MapWithNoSSR = dynamic(() => import("@/components/mapbox/Map"), {
    ssr: false,
  });

  const center: LatLngExpression = [-2.9761, 104.7754]; // Koordinat pusat peta
  const zoom = 12;

  if (isLoading) return <p>Loading peta...</p>;
  return (
    <div>
      <div className="justify-between items-start h-[500px] pb-8">
        <h1 className="mb-5 text-3xl font-bold">Lokasi CCTV</h1>
        <MapWithNoSSR
          zoom={zoom}
          // position={center}
          locations={data ?? []}
        ></MapWithNoSSR>
      </div>
    </div>
  );
}
