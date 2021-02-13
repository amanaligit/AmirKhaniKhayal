// src/components/logout-button.js

import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from 'reactstrap'

const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    // <button
    //   className="btn btn-danger btn-block"
    //   onClick={() =>
    //     logout({
    //       returnTo: window.location.origin,
    //     })
    //   }
    // >
    //   Log Out
    // </button>
    <Button color="info" outline onClick={() =>
      logout({
        returnTo: window.location.origin,
      })}>
      <span className="fa fa-sign-in fa-lg"></span> Log out
    </Button>
  );
};

export default LogoutButton;
