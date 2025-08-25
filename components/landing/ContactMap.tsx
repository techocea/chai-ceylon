"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icon not showing
import "leaflet/dist/images/marker-icon-2x.png";
import "leaflet/dist/images/marker-shadow.png";

const icon = L.icon({
    iconUrl: "/marker-icon.svg",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

// Update the Location type to match the new data structure
type Location = {
    _id?: string;
    label: string;
    latitude: number;
    longitude: number;
};

export default function ContactMap({ locations }: { locations: Location[] }) {
    // Filter out any locations without valid coordinates
    const validLocations = locations.filter(
        (loc) => loc.latitude !== undefined && loc.longitude !== undefined
    );

    if (validLocations.length === 0) return null;

    // Set the map center to the first valid location
    const centerPosition = [
        validLocations[0].latitude,
        validLocations[0].longitude,
    ] as [number, number];

    return (
        <MapContainer
            center={centerPosition}
            zoom={50}
            scrollWheelZoom={true}
            className="w-full h-[500px] rounded-xl shadow-lg"
        >
            <TileLayer
                attribution='© <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {validLocations.map((loc, idx) => (
                <Marker
                    key={loc._id || idx}
                    position={[loc.latitude, loc.longitude]}
                    icon={icon}
                >
                    <Popup>
                        <a
                            href={`https://www.google.com/maps/search/?api=1&query=${loc.latitude},${loc.longitude}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline"
                        >
                            {loc.label}
                        </a>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}
