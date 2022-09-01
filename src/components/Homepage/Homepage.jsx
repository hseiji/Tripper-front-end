import React from "react";
import { Map } from "../Map/Map";
import "./Homepage.css";
import { ResultList } from "../ResultList/ResultList";
import { ListEvents } from "../ListEvents/ListEvents";
import { ListCategories } from "../ListCategories/ListCategories";

export default function Homepage() {
  
  const user = {
    id: 1,
    lat: 43.64446719365264,
    lng: -79.38649706503828,
  };
  
  return (
    <div className="wrapper-main">
      <div className="wrapper-left">
        <ListCategories/>
        <div className="info">
          <ListEvents />
          <ResultList />
        </div>
      </div>
      <div className="wrapper-right" id="map">
        {user && <Map user={user} />}
      </div>
    </div>
  );
}
