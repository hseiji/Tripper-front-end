import React, { useContext } from "react";
import { SearchBar } from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { AppContext } from "../hooks/useAppContext";

const logo = require("./TripperLogo.png");

export default function Navbar({ setFormData }) {
  // const clearData = () => {
  //   return setFormData("");
  // };
  const { user } = useContext(AppContext);

  // For presentation purposes...Demo
  const username = "Shakespeare";

  return (
    <div className="navbar">
      <div className="navbarLogo" href="#">
        <Link to="/">
          <img
            src={logo}
            width="350"
            height="180"
            // onClick={clearData}
            alt=""
          ></img>
        </Link>
      </div>

      <SearchBar />

      {!username && (
        <div className="signIn">
          <Link to="/login">
            <button>Sign In</button>
          </Link>
        </div>
      )}

      {username && (
        <div className="signOut">
          <h3>Hi, {user.name}</h3>
          <Link to="/profile">
            {/* <button>User Profile</button> */}
          </Link>
          <Link to="/login">
            {/* <button onClick={clearData}>Log Out</button> */}
            <b>Logout</b>
          </Link>
        </div>
      )}
    </div>
  );
}
