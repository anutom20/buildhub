"use client";
import React from "react";
import MenuItem from "./MenuItem";

type Menu = {
  heading: string;
  items: any[];
};

const Menu: React.FC<Menu> = ({ heading, items }) => {
  return (
    <div className="mt-3 p-2 w-full">
      <span className="font-bold text-sm ml-2 text-darkCharcoal">
        {heading}
      </span>
      {items.map((item, index) => {
        return (
          <>
            <MenuItem
              icon={item.icon}
              text={item.text}
              type={heading}
              number={index + 1}
            />
          </>
        );
      })}
    </div>
  );
};

export default Menu;
