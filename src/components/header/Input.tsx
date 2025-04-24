import React from "react";
import { GoSearch } from "react-icons/go";

const Input = () => {
  return (
    <form className="flex items-center gap-2 text-gray-500">
      <button>
        <GoSearch />
      </button>

      <input type="text" placeholder="ara" className="p-1 outline-none" />
    </form>
  );
};

export default Input;
