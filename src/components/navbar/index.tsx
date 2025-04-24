import { sections } from "@/utils/constants";
import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import NavLink from "./NavLink";

const Navbar = () => {
  return (
    <div className="min-h-screen min-w-[60px]  shadow-lg  text-black">
      <div className="navbar flex flex-col gap-5 text-gray-500 fixed h-screen z-50 border-r border-zinc-300 bg-white">
        <button className="grid place-items-center pt-5 text-2xl w-[60px] ">
          <input type="checkbox" id="menu-toggle" />
          <label htmlFor="menu-toggle">
            <RxHamburgerMenu />
          </label>
        </button>

        <div>
          {sections.map((i, key) => (
            <NavLink key={key} {...i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
