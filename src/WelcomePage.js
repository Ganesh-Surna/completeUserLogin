import React, { useState } from "react";
import App from "./App";
import "./WelcomePage.css";

const WelcomePage = ({ username, password }) => {
  const [isSignout, setIsSignout] = useState(false);
  const [isRemoveAccount, setIsRemoveAccount] = useState(false);

  const handleSignout = () => {
    setIsSignout(true);
  };

  const userObjArrStored = JSON.parse(
    localStorage.getItem("userObjArrStoredKey")
  );

  const handleRemoveAccount = () => {
    let index = userObjArrStored.findIndex((eachUser) => {
      if (eachUser.username === username && eachUser.password === password) {
        return true;
      }
    });
    userObjArrStored.splice(index, 1);
    localStorage.setItem(
      "userObjArrStoredKey",
      JSON.stringify(userObjArrStored)
    );
    setIsRemoveAccount(true);
  };

  let component = (
    <div className="container3">
      <h1 className="head2">Hello {username}!</h1>
      <p className="para">Your password is "{password}"</p>
      <div>
        <button className="button-signout button" onClick={handleSignout}>Sign Out</button>
        <button className="button-remove button" onClick={handleRemoveAccount}>Remove Account</button>
      </div>
    </div>
  );

  if (isSignout) {
    component = <App />;
  }
  if (isRemoveAccount) {
    component = <App />;
  }
  return(
    <div>
    {component}
    </div>
  );
};
export default WelcomePage;
