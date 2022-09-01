import React, { useContext } from "react";
import { AppContext } from "../hooks/useAppContext";
import { ListPlans } from "../ListPlans/ListPlans";
import { NewPlan } from "../NewPlan/NewPlan";
import "./ListEvents.css"

export const ListEvents = () => {
  const { events, changeIconColor, deleteFromMap } =
    useContext(AppContext);

  return (
    <div className="list">
      <NewPlan />
      <ListPlans />

      <p>
        {events.length > 0 ? (
          <>
          </>
        ) : (
          <b>You don't have anything planned yet =/</b>
        )}
      </p>

      <ol style={{}}>
        {events.map((item) => {
          return (
            <div className="events" key={item.id}>
              <li key={item.id}>
                <a href={item.image} target="_blank" rel="noopener noreferrer" style={{"fontSize":"20px", "fontWeight":"300"}}>
                  {item.name}
                </a>
                  {item.done === false ? (
                  <i
                    className="fa-solid fa-check"
                    onClick={() => changeIconColor(item.id)}
                    style={{"paddingLeft": "10px"}}
                  ></i>
                ) : (
                  <i
                    className="fa-solid fa-clock-rotate-left"
                    onClick={() => changeIconColor(item.id)}
                    style={{"paddingLeft": "10px"}}
                  ></i>
                )}
                <i
                  className="fa-solid fa-trash"
                  onClick={() => deleteFromMap(item.id)}
                  style={{"paddingLeft": "10px"}}
                ></i>
                
                <p>{item.address}</p>             
                <p>
                  <img src={item.image_url} alt="" height="150px" width="150px" />
                </p>
              </li>
            </div>
          );
        })}
      </ol>
    </div>
  );
};
