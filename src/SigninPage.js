import React, { useState } from "react";
import WelcomePage from "./WelcomePage";
import SignupPage from "./SignupPage";
import "./SigninPage.css";

const SigninPage = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [issigninOk, setIsSigninOk] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  const handleNameChange = (event) => {
    setUserName(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSignup = () => {
    setIsSignup(true);
  };

  const userObjArrStored = JSON.parse(
    localStorage.getItem("userObjArrStoredKey")
  );

  const handleSignin = (event) => {
    event.preventDefault();
    const userData = { username: username, password: password };
    let exist = false;

    if (userObjArrStored === null) {
      exist = false;
    } else {
      for (let eachUser of userObjArrStored) {
        if (
          eachUser.username === userData.username &&
          eachUser.password === userData.password
        ) {
          exist = true;
          break;
        }
      }
    }
    if (exist) {
      setIsSigninOk(true);
    } else {
      setError("Enter correct Username and Password!");
      setIsSigninOk(false);
      setUserName("");
      setPassword("");
    }
  };

  let component = (
    <div className="container1">
      <h1 className="head">Sign In to Continue</h1>
      <form>
        <div className="form-group">
          <label>User Name:</label>
          <input
            placeholder="Enter username"
            type="text"
            value={username}
            onChange={handleNameChange}
            required
          />
        </div>
        <div className="form-group">
          <label>password:</label>
          <input
            placeholder="Enter password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit" className="btn-signin" onClick={handleSignin}>
          Sign In
        </button>
      </form>
      {error && <p className="footer-text error">{error}</p>}
      <p className="footer-text">
        Don't you have an account? <a onClick={handleSignup}>Sign Up</a>
      </p>
    </div>
  );
  if (isSignup) {
    component = <SignupPage />;
  }
  if (issigninOk) {
    component = <WelcomePage username={username} password={password} />;
  }
  return <div>{component}</div>;
};
export default SigninPage;
