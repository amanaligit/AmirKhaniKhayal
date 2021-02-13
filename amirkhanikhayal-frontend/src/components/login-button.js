// src/components/login-button.js

import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from 'reactstrap'

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    // <button
    //   className="btn btn-primary btn-block"
    //   onClick={() => loginWithRedirect()}
    // >
    //   Log In
    // </button>
    <Button color="info" onClick={() => loginWithRedirect()}>
      <span className="fa fa-sign-in fa-lg"></span> Login
    </Button>
  );
};

export default LoginButton;
