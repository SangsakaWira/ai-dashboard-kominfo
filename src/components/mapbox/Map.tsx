import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { LatLngExpression } from "leaflet";
import { CCTV, Location } from "@/types";

interface MyMapProps {
  // position: LatLngExpression;
  zoom?: number;
  locations: CCTV[]
}

export default function MyMap({ locations, zoom }: MyMapProps) {
  if (!locations || locations.length === 0) return <p>Lokasi tidak ditemukan.</p>;

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
        <Marker key={c.id}  position={[parseFloat(c.latitude), parseFloat(c.longitude)]}>
          <Popup>
            <div>
              <p className="font-semibold">{c.name}</p>
              {/* <p>{c.name}</p> */}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
