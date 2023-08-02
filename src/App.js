import React, { useState } from "react";
import SigninPage from "./SigninPage";
import SignupPage from "./SignupPage";
import "./App.css";

export default function App() {
  const [isSignin, setIsSignin] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  //localStorage.removeItem("userObjArrStoredKey");

  const handleSignin = () => {
    setIsSignin(true);
  };
  const handleSignup = () => {
    setIsSignup(true);
  };
  let component = (
    <div className="container">
      <h1>Home Page</h1>
      <div className="button-container">
        <button className="button button-primary" onClick={handleSignin}>Sign In</button>
        <button className="button button-secondary" onClick={handleSignup}>Sign Up</button>
      </div>
    </div>
  );
  if (isSignin) {
    component = <SigninPage />;
  }
  if (isSignup) {
    component = <SignupPage />;
  }

  return <div className="bg-container">{component}</div>;
}
