import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const position = [-6.891815, 107.610251]

function Maps() {
    return (
        <MapContainer center={position} zoom={15} scrollWheelZoom={false} style={{width: '100%', height: '700px'}}>
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
        
// import { useEffect } from "react";
// import { Box } from "@chakra-ui/react";

// function Maps() {
//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAJK_x9PtQF-TyAsl5oTT2zcg6y1cZrhKU&callback=initMap`;
//     script.async = true;
//     document.body.appendChild(script);

//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   return null;
// }

// // function Maps() {
// //   return (
// //     <Box>
// //         <MyMap />
// //     </Box>
// //   );
// // }

// export default Maps;