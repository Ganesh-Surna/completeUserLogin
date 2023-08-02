import React, { useState } from "react";
import SigninPage from "./SigninPage";
import "./SignupPage.css";

const SignupPage = () => {
  const [userData, setUserData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [issignupOk, setIsSignupOk] = useState(false);
  const [isSignin, setIsSignin] = useState(false);

  const handleNameChange = (event) => {
    setUserData((prevData) => {
      return { ...prevData, username: event.target.value };
    });
  };
  const handlePasswordChange = (event) => {
    setUserData((prevData) => {
      return { ...prevData, password: event.target.value };
    });
  };

  const handleSignin = () => {
    setIsSignin(true);
  };

  const userObjArrStored = JSON.parse(
    localStorage.getItem("userObjArrStoredKey")
  );

  const handleSignup = (event) => {
    event.preventDefault();
    if (userData.username.trim() === "" || userData.password.trim() === "") {
      setError("Enter valid Username and password!");
    } else {
      if (userObjArrStored === null) {
        localStorage.setItem("userObjArrStoredKey", JSON.stringify([userData]));
      } else {
        let exist = false;
        for (let eachUser of userObjArrStored) {
          if (
            eachUser.username === userData.username &&
            eachUser.password === userData.password
          ) {
            exist = true;
            break;
          }
        }
        if (exist) {
          setError("You already have an account. You can sign in.");
        } else {
          setIsSignupOk(true);
          userObjArrStored.push(userData);
          localStorage.setItem(
            "userObjArrStoredKey",
            JSON.stringify(userObjArrStored)
          );
          setError("Your account has been created. You can now sign in.");
        }
      }
    }
    setUserData({ username: "", password: "" });
  };

  let component = (
    <div className="container2">
      <h1 className="head1">Sign Up for Free</h1>
      <form>
        <div className="form-group">
          <label>User Name:</label>
          <input
            placeholder="Enter username"
            type="text"
            value={userData.username}
            onChange={handleNameChange}
            required
          />
        </div>
        <div className="form-group">
          <label>password:</label>
          <input
            placeholder="Enter password"
            type="password"
            value={userData.password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button className="btn-signup" type="submit" onClick={handleSignup}>
          Sign Up
        </button>
        {error && <p className="footer-text error">{error}</p>}
        <p className="footer-text">
          Already have an account? <a onClick={handleSignin}>Sign In</a>
        </p>
      </form>
    </div>
  );
  if (isSignin) {
    component = <SigninPage />;
  }
  if (issignupOk) {
    component = (
      <div>
        <SigninPage />
      </div>
    );
  }
  return <div>{component}</div>;
};
export default SignupPage;
