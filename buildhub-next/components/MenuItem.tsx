"use client";
import React, { ReactNode } from "react";

type MenuItem = {
  icon: ReactNode;
  text: string;
  type: string;
  number: number;
};

const MenuItem: React.FC<MenuItem> = ({ icon, text, type, number }) => {
  return (
    <div className="flex justify-between px-2 py-1 relative rounded-md hover:bg-darkBg transition w-full">
      <a href="#" className="flex justify-content items-center gap-2">
        <span>{icon}</span>
        <span>{text}</span>
      </a>
      {type === "Phases" && (
        <div className="flex items-center">
          <div className="flex items-center text-center justify-center align w-4 h-4 rounded-full bg-numbersBg text-white text-[10px]">
            {number}
          </div>
        </div>
      )}
      {type === "Phases" && text !== "Post-launch actions" && (
        <div className=" w-px absolute top-[20px] bottom-[10px] right-[17px] text-gray-400">
          |
        </div>
      )}
    </div>
  );
};

export default MenuItem;
