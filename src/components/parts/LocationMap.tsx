"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

const markerIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

type Props = {
  latitude: string;
  longitude: string;
};

export function LocationMap({ latitude, longitude }: Props) {
  const lat = Number(latitude);
  const lng = Number(longitude);

  if (!lat || !lng) {
    return (
      <p className="text-muted-foreground text-sm">Tidak ada data lokasi.</p>
    );
  }

  const center: [number, number] = [
    parseFloat(latitude),
    parseFloat(longitude),
  ];

  return (
    <div className="w-full h-[300px] rounded-lg overflow-hidden border mt-4">
      <MapContainer
        center={center}
        zoom={15}
        scrollWheelZoom={false}
        // className="h-full w-full"
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={[parseFloat(latitude), parseFloat(longitude)]} icon={markerIcon}>
          <Popup>
            Lokasi <br />
            Lat: {lat}
            <br />
            Lng: {lng}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
