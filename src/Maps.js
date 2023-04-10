import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const position = [-6.891815, 107.610251]

function Maps() {
    return (
        <MapContainer center={position} zoom={15} scrollWheelZoom={false} style={{width: '100%', height: '100%'}}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}.png?key=2iImvwrVlpgKGfTyZPQt"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    );
}

export default Maps;