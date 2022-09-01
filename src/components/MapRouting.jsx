import { useContext, useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { AppContext } from "./hooks/useAppContext";

L.Marker.prototype.options.icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png"
});

export default function MapRouting(props) {
  // const map = useMap();
  const { events } = useContext(AppContext);

  useEffect(() => {

    console.log("rendering routes");

    if (!props.map) return;

    // build destinations array
    const destinations = [];
    events.forEach((event) => {
      destinations.push(L.latLng(event.lat, event.lng))
    })

    const routingControl = L.Routing.control({
      // waypoints: [L.latLng(43.64446719365264, -79.38649706503828), L.latLng(43.64220060887206, -79.3864107609249), L.latLng(43.6713124, -79.3838651)],
      waypoints: destinations,
      routeWhileDragging: true
    }).addTo(props.map);

    return () => props.map.removeControl(routingControl);
  }, [events]);

  return null;
}