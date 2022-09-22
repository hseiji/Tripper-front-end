import React, { useContext, useEffect } from "react";
import { Map } from "../Map/Map";
import "./Homepage.css";
import { ResultList } from "../ResultList/ResultList";
import { ListEvents } from "../ListEvents/ListEvents";
import { ListCategories } from "../ListCategories/ListCategories";
import { AppContext } from "../hooks/useAppContext";

export default function Homepage() {
  
  const { user } = useContext(AppContext);

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
