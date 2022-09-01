import React, { useContext } from "react";
import { AppContext } from "../hooks/useAppContext";
import { ProfileEvents } from "../ProfileEvents";
import "./Profile.css";

export const Profile = () => {
  const { plans } =
    useContext(AppContext);


  return (
    <div className="wrapper-profile">
      <div className="profile">

      {plans.length > 0 ? (
        <>
          <b>My Plans:</b>
        </>
      ) : (
        <h3>No plans to show, go create a plan!</h3>
      )}

        <div className="profile1">
          <ul>
            <div>
              <ol>
                {plans.map((item) => {
                  console.log("item:", item);
                  return (
                    <li key={item.id}>
                      {item.name}
                      <ProfileEvents key={item.id} plan_id={item.id}/>
                    </li>
                  );
                })}
              </ol>
            </div>
          </ul>
        </div>

      </div>
    </div>
  );
};
