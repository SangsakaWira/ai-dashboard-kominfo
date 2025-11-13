'use client'

import { useAllLocation } from "@/services/location.service";
import { LatLngExpression } from "leaflet";
import dynamic from "next/dynamic";
import React from "react";

type Props = {};

export default function LocationsPage({}: Props) {
  const MapWithNoSSR = dynamic(() => import("@/components/mapbox/Map"), {
    ssr: false,
  });

  const center: LatLngExpression = [-2.9761, 104.7754]; // Koordinat pusat peta
  const zoom = 12;

  const {data, isLoading} = useAllLocation()
  if (isLoading) return <p>Loading peta...</p>;
  return (
    <div>
      <div className="justify-between items-start h-[500px]">
        <h1 className="mb-5 text-3xl font-bold">Lokasi CCTV</h1>
        <MapWithNoSSR
          zoom={zoom}
          // position={center}
          locations={data ?? []}
        ></MapWithNoSSR>
      </div>
      {/* <TabsContent value="locations">
      </TabsContent> */}
    </div>
  );
}
