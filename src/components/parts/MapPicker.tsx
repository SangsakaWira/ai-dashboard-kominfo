"use client";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { useEffect, useState } from "react";

const markerIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconAnchor: [12, 41],
});

interface MapPickerProps {
  value?: { lat: number; lng: number };
  onChange: (value: { lat: number; lng: number }) => void;
}

export function MapPicker({ value, onChange }: MapPickerProps) {
  const defaultPosition = { lat: -2.9549655, lng: 104.680392 };

  const initialPosition =
    value && value.lat !== 0 && value.lng !== 0 ? value : defaultPosition;

  const [position, setPosition] = useState(initialPosition);

  useEffect(() => {
    if (value && value?.lat !== 0 && value?.lng !== 0) {
      setPosition(value);
    }
  }, [value]);

  function LocationMarker() {
    useMapEvents({
      click(e) {
        const pos = { lat: e.latlng.lat, lng: e.latlng.lng };
        setPosition(pos);
        onChange(pos);
      },
    });

    return <Marker position={position} icon={markerIcon} />;
  }

  return (
    <div className="rounded-md overflow-hidden border">
      <MapContainer
        center={[position.lat, position.lng]}
        zoom={8}
        style={{ height: "300px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationMarker />
      </MapContainer>
    </div>
  );
}
