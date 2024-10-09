import React from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import './RegisterPost.css';

const Map = () => {
  return (
    <div className="p-5 bg-dark">
      <MapContainer
        center={[35.715298, 51.404343]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[35.715298, 51.404343]}></Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
