import "./App.css";
import React, {useState} from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";
import Navbar from "./components/Navbar/Navbar";
import { AppProvider } from "./components/hooks/useAppContext";
import Login from "./components/Login/Login"
import { Profile } from "./components/Profile/Profile";
function App() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = formData;

  
  return (
    <div className="App">
      <AppProvider>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar username={username} password={password} setFormData={setFormData}/>
                <Homepage />
              </>
            }
          />
           <Route
            path="/login"
            element={
              <>
              <Navbar />
              <Login formData={formData} setFormData={setFormData} username={username} password={password}/>
              </>
            }
          />
        <Route
            path="/profile"
            element={
              <>
              <Navbar Navbar username={username} password={password} setFormData={setFormData}/>
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

/*
useParams -- might be named something else

useNavigate

not version 5 react router dom
*/
