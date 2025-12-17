import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
// import { LatLngExpression } from "leaflet";
import { CCTV } from "@/types";

interface MyMapProps {
  // position: LatLngExpression;
  zoom?: number;
  locations: CCTV[];
}

export default function MyMap({ locations, zoom }: MyMapProps) {
  if (!locations || locations.length === 0)
    return <p>Lokasi tidak ditemukan.</p>;

  const center: [number, number] = [
    parseFloat(locations[0].latitude),
    parseFloat(locations[0].longitude),
  ];

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
      className="z-0 rounded-l-lg"
    >
      <TileLayer
        url="https://api.mapbox.com/styles/v1/mapbox/navigation-night-v1/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoid2FuZ2dvciIsImEiOiJjbWMycXdzMzIwZGFqMmpzZmludHh3OWdoIn0.cFO7rG6N6HS0KqbJ97M1Cg"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {locations.map((c) => (
        <Marker
          key={c.id}
          position={[parseFloat(c.latitude), parseFloat(c.longitude)]}
        >
          <Popup>
            <div>
              <h4 className="font-bold">{c?.name?.toUpperCase() ?? ""}</h4>
              <div className="flex items-center gap-2 mt-1">
                <span className={`flex items-center gap-x-1`}>
                  <div
                    className={`w-[10px] h-[10px] rounded-full ${c.status === "danger" ? "bg-red-500" : "bg-green-500"}`}
                  ></div>{" "}
                  {c.status}
                </span>
                {c?.category && (
                  <span className="text-xs bg-gray-200 px-2 py-[2px] rounded-md">
                    {c.category}
                  </span>
                )}
              </div>

              <div className="text-[13px] mt-2 space-y-1">
                <div className="flex justify-between gap-x-3">
                  <span className="text-gray-500">Lokasi</span>
                  <span>{`${Number(c.latitude).toFixed(4)}, ${Number(c.longitude).toFixed(4)}`}</span>
                </div>

                <div className="flex justify-between gap-x-3">
                  <span className="text-gray-500">Kapasitas</span>
                  {c.capacity_building ? (
                    <span>{c.capacity_building} m³</span>
                  ) : <span>-</span>}
                </div>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
