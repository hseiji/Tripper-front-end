import Axios from 'axios';
import React, { useContext } from 'react'
import { AppContext } from '../hooks/useAppContext';
import './ListCategories.css'

export const ListCategories = () => {

  const { location, setResults } = useContext(AppContext);

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

  const handleSubmit = async (keyword) => {

    try {
      console.log("search for: ", keyword, location);
      const resp = await Axios.get(`/api/events/${keyword}/${location}`);
      resultsSet(resp.data);

      console.log("results:", resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <b style={{"fontFamily":"Copperplate", "fontSize":"25px"}}>Categories:</b>
      <i className="fa-solid fa-utensils fa-2x" onClick={() => handleSubmit("food")}></i>
      <i className="fa-solid fa-masks-theater fa-2x" onClick={() => handleSubmit("museum")}></i>
      <i className="fa-solid fa-cart-shopping fa-2x" onClick={() => handleSubmit("shop")}></i>
      <i className="fa-solid fa-tree fa-2x" onClick={() => handleSubmit("park")}></i>
      {/* <button onClick={() => handleSubmit("shop")}> test</button> */}
    </div>
  )
}
