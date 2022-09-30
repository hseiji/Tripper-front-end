import Axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { AppContext } from "../hooks/useAppContext";

import "./Login.css";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const handleSubmit = async (event) => {
    //Prevent page reload
    event.preventDefault();

    try {
      console.log("handling submit");
      const user = {
        email,
        password
      }
      console.log("user:", user);
  
      const newUser = await Axios.post('/api/users/login', user);
      console.log("newUser:", newUser);
  
      nav("/");
    } catch (error) {
      console.log(error);
    }

  };


  const isSubmitted = false;
  const renderForm = (
    
    <div className="form">
      <form onSubmit={()=>console.log("submit test")}>
        <div className="input-container">
          <label>Email </label>
          <input
            
            onChange={e => setEmail(e.target.value)}
            type="text"
            name="email"
            required
          />
          
        </div>
        <div className="input-container">
          <label>Password </label>
          <input
            
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            type="text"
            required
          />
          
        </div>
        <div className="button-container">
          <input type="submit" onClick={handleSubmit}/>
        </div>
      </form>
    </div>
  );


  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Sign In</div>
        {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
      </div>
    </div>
  );
}
