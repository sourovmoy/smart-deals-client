import React from "react";
import { Commet } from "react-loading-indicators";

const Loading = () => {
  return (
    <div className="flex justify-center min-h-screen items-center">
      <Commet color="#632EE3" size="large" text="loading" textColor="#632EE3" />
    </div>
  );
};

export default Loading;
