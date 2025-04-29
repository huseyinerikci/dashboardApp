import React from "react";
import { FaSpinner } from "react-icons/fa";

const Loading = ({ designs }: { designs?: string }) => {
  return (
    <div className={`h-full w-full flex-1 grid place-items-center ${designs}`}>
      <FaSpinner className="animate-spin text-blue-500 text-3xl" />
    </div>
  );
};

export default Loading;
