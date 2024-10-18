"use client";
import React from "react";

const ProjectDropdown = () => {
  return (
    <section className="bg-darkBg rounded-lg shadow-lg p-2 mx-2 h-max z-10">
      <button className="px-2 py-1 border-none text-primary hover:bg-hoverBg rounded-md w-full text-left">
        Create new project
      </button>

      <hr className="border-gray-500 mt-1" />
      <div className="text-md">
        <div className="px-2 py-1">
          <span className="border-none text-charcoal text-bold">
            first project
          </span>
        </div>
        <button className="px-2 py-1 hover:bg-hoverBg border-none w-full rounded-md text-left ">
          Invite Collaborator
        </button>
        <button className="px-2 py-1 hover:bg-hoverBg border-none w-full rounded-md text-left ">
          Manage Access
        </button>
        <button className="px-2 py-1 hover:bg-hoverBg border-none w-full rounded-md text-left ">
          Rename Project
        </button>
        <button className="px-2 py-1 hover:bg-hoverBg border-none w-full rounded-md text-left text-red-500 ">
          Delete Project
        </button>
      </div>
    </section>
  );
};

export default ProjectDropdown;
