import React, { useContext } from "react";
import { AppContext } from "../hooks/useAppContext";

export const ListPlans = () => {
  const { plans, changePlan, onOffRoutes } = useContext(AppContext);

  return (
    <p>
      <b style={{"fontFamily":"Copperplate", "fontSize":"20px"}}>My Plan: </b>
      <select onChange={(e) => changePlan(e.target.value)}>
        {plans.map((option) => (
          <option value={option.id} key={option.id}>{option.name}</option>
        ))}
      </select>
      <i
        className="fa-solid fa-map-location-dot fa-2x"
        onClick={() => onOffRoutes()}
      ></i>
    </p>
  );
};
