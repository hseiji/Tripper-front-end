import React, { useContext } from "react";
import { SearchBar } from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { AppContext } from "../hooks/useAppContext";

const logo = require("./TripperLogo.png");

export default function Navbar() {

  const { user, logoutUser } = useContext(AppContext);

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

      {!user.name && (
        <div className="signIn">
          <Link to="/login">
            <button>Sign In</button>
          </Link>
        </div>
      )}

      {user.name && (
        <div className="signOut">
          <h3>Hi, {user.name}</h3>
          <Link to="/">
            <button onClick={logoutUser}>Log Out</button>
          </Link>
        </div>
      )}
    </div>
  );
}
