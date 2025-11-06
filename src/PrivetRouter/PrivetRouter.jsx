import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Navigate, useLocation } from "react-router";
import { Commet } from "react-loading-indicators";

const PrivetRouter = ({ children }) => {
  const { user, loader } = useContext(AuthContext);
  const location = useLocation();

  if (loader) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Commet color="#632EE3" size="large" text="" textColor="" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to={"/auth/login"} state={location?.pathname}></Navigate>;
  }

  return <div>{children}</div>;
};

export default PrivetRouter;
