import React from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import { MapLayer } from '../MapLayer/MapLayer';

export const Map = (props) => {

  // Plan based on user_id
  const plan = {
    id: 1,
  }

  return (
    <MapContainer center={[props.user.lat, props.user.lng]} zoom={13} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapLayer key={plan.id} />


    </MapContainer>
  )
}
