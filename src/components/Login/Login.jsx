import React, { useContext } from "react";
import { AppContext } from "../hooks/useAppContext";

import "./Login.css";

export default function Login({ formData, setFormData, username, password }) {
  // React States
  // const [errorMessages, setErrorMessages] = useState({});
  // const [isSubmitted, setIsSubmitted] = useState(false);
  // const [formData, setFormData] = useState({
  //   username: "",
  //   password: "",
  // });

  // const { username, password } = formData;

  // User Login info
  // const database = [
  //   {
  //     username: "user1",
  //     password: "pass1",
  //   },
  //   {
  //     username: "lighthouse",
  //     password: "labs",
  //   },
  // ];

  // const errors = {
  //   uname: "invalid username",
  //   pass: "invalid password",
  // };

  const { login } = useContext(AppContext);

  // const handleChange = (e) => {
  //   const newFormData = { ...formData };
  //   newFormData[e.target.name] = e.target.value;
  //   setFormData(newFormData);
  // };

  // const handleSubmit = (event) => {
  //   //Prevent page reload
  //   event.preventDefault();

  //   login(username, password);
  //   console.log("name:", username);

    // // Check if input form is equal with database
    // const loginChecker = database.filter((credential) => {
    //   return (
    //     credential.username === username && credential.password === password
    //   );
    // });

    // if (loginChecker.length) {
    //   navigate("/");
    //   setIsSubmitted(true);
    // }
  // };

  // var { uname, pass } = document.forms[0];
  // console.log("doc forms", document.forms);
  // Find user login info
  // const userData = database.find((user) => user.username === uname.value);

  // Compare user info
  //   if (userData) {
  //     if (userData.password !== pass.value) {
  //       // Invalid password
  //       setErrorMessages({ name: "pass", message: errors.pass });
  //     } else {
  //       setIsSubmitted(true);
  //     }
  //   } else {
  //     // Username not found
  //     setErrorMessages({ name: "uname", message: errors.uname });
  //   }
  // };

  // Generate JSX code for error message
  // const renderErrorMessage = (name) =>
  //   name === errorMessages.name && (
  //     <div className="error">{errorMessages.message}</div>
  //   );

  // JSX code for login form
  // const renderForm = (
  //   <div className="form">
  //     <form onSubmit={handleSubmit}>
  //       <div className="input-container">
  //         <label>Username </label>
  //         <input
  //           value={username}
  //           onChange={handleChange}
  //           type="text"
  //           name="username"
  //           required
  //         />
  //         {/* {renderErrorMessage("uname")} */}
  //       </div>
  //       <div className="input-container">
  //         <label>Password </label>
  //         <input
  //           value={password}
  //           onChange={handleChange}
  //           name="password"
  //           type="text"
  //           required
  //         />
  //         {/* {renderErrorMessage("pass")} */}
  //       </div>
  //       <div className="button-container">
  //         <input type="submit" />
  //       </div>
  //     </form>
  //   </div>
  // );

  console.log(username, password);

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Sign In</div>
        {/* {isSubmitted ? <div>User is successfully logged in</div> : renderForm} */}
      </div>
    </div>
  );
}
