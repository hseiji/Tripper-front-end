import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";
import Navbar from "./components/Navbar/Navbar";
import { AppProvider } from "./components/hooks/useAppContext";
import Login from "./components/Login/Login"
import { Profile } from "./components/Profile/Profile";
function App() {

  return (
    <div className="App">
      <AppProvider>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Homepage />
              </>
            }
          />
           <Route
            path="/login"
            element={
              <>
              <Navbar />
              <Login />
              </>
            }
          />
        <Route
            path="/profile"
            element={
              <>
              <Navbar />
              <Profile />
              </>
            }
          />
        </Routes>
      </AppProvider>
    </div>
  );
}

export default App;
