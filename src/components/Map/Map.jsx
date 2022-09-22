import React from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import { MapLayer } from '../MapLayer/MapLayer';

export const Map = (props) => {

  // Using one layer
  const map = {
    id: 1,
  }

  // Center map
  const centerInfo = [ 43.6532976025993, -79.38359538925825]

  console.log("rendering map");

  return (
    <MapContainer center={centerInfo} zoom={13} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapLayer key={map.id} />


    </MapContainer>
  )
}
