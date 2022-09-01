import React, { useContext } from "react";
import axios from "axios";
import "./SearchBar.css";
import { AppContext } from "../hooks/useAppContext";

export const SearchBar = () => {

  const { setResults, location, setLocation, keyword, setKeyword } = useContext(AppContext);

  const resultsSet = (data) => {
    const infoAll = [];
    data.forEach((item) => {
      const infoItem = {
        id: item.id,
        name: item.name,
        rating: item.rating,
        latitude: item.coordinates.latitude,
        longitude: item.coordinates.longitude,
        review: item.review_count,
        image_url: item.image_url,
        url: item.url,
        alias: item.alias,
        address: `${item.location.address1}, ${item.location.city}`
      };
      infoAll.push(infoItem);
    });
    // console.log("infoAll", infoAll);
    
    setResults(infoAll);
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resp = await axios.get(`/api/events/${keyword}/${location}`);
      resultsSet(resp.data);
      console.log("results:", resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeKeyword = (e) => {
    setKeyword(e.target.value);
    console.log("change", keyword);
  };

  const handleChangeLocation = (e) => {
    setLocation(e.target.value);
  };

  return (
    <div className="searchbar">
      {/* <h2>Search</h2> */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Keyword..."
          id="keyword"
          value={keyword}
          onChange={(e) => handleChangeKeyword(e)}
        ></input>
        <input
          type="text"
          placeholder="Location..."
          id="location"
          value={location}
          onChange={(e) => handleChangeLocation(e)}
        ></input>
        <button className="button-51">Search</button>

      </form>
    </div>
  );
};
