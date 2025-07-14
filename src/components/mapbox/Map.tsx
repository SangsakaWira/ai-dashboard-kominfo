import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { LatLngExpression } from "leaflet";

interface MyMapProps {
    position: LatLngExpression;
    zoom: number;
    title: string;
}

export default function MyMap({ position, zoom, title }: MyMapProps) {
    return (
        <MapContainer
            center={position}
            zoom={zoom}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }} // Pastikan CSS ini ditetapkan
            className="z-0 rounded-l-lg"
        >
            <TileLayer
                url="https://api.mapbox.com/styles/v1/mapbox/navigation-night-v1/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoid2FuZ2dvciIsImEiOiJjbWMycXdzMzIwZGFqMmpzZmludHh3OWdoIn0.cFO7rG6N6HS0KqbJ97M1Cg"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position}>
                <Popup>
                    <p>{title}</p>
                </Popup>
            </Marker>
        </MapContainer>
    );
}