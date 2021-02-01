// src/views/profile.js

import React from "react";
import useAdminStatus from '../hooks/useAdminStatus'
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user } = useAuth0();
  const { name, picture, email } = user;
  const isAdmin = useAdminStatus();
  return (

    <div className="container">

      <div className="row align-items-center profile-header">
        <div className="col-md-2 mb-3 ">
          <div className="row justify-content-center">
            <img
              src={picture}
              alt="Profile"
              className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
            />
          </div>
          <div className="row justify-content-center">{isAdmin ? <h3><span class="badge badge-primary">Admin</span></h3> : <h3><span class="badge badge-primary">User</span></h3>}</div>

        </div>
        <div className="col-md text-center text-md-left">
          <h2>{name}</h2>
          <p className="lead text-muted">{email}</p>

        </div>
      </div>
      <div className="row">
        <pre className="col-12 text-light bg-dark p-4">
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default Profile;
