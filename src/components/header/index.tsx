import React from "react";
import Input from "./Input";
import { BiSolidBellRing } from "react-icons/bi";
import Image from "next/image";
import avatar from "@/assets/images/user_image.webp";

const Header = () => {
  return (
    <div className="border-b border-zinc-300 p-5 md:px-8 bg-white text-black flex justify-between">
      <Input />

      <div className="flex items-center gap-5">
        <BiSolidBellRing className="text-xl text-zinc-700 cursor-pointer" />

        <div className="flex gap-3">
          <Image
            src={avatar}
            alt="avatar"
            width={50}
            height={50}
            className="size-12 rounded-full"
          />

          <div>
            <p className="font-semibold">Hüseyin</p>
            <p className="text-sm text-zinc-500">Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
