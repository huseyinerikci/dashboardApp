import React from "react";
import { FaSpinner } from "react-icons/fa";

const Loading = () => {
  return (
    <div className="h-full grid  place-items-center">
      <FaSpinner className="animate-spin text-blue-500 text-3xl" />
    </div>
  );
};

export default Loading;
