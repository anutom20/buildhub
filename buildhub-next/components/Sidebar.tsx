"use client";
import ProjectDropdown from "./ProjectDropdown";
import React, { useState } from "react";
import Menu from "./Menu";
import { IoChevronDownOutline } from "react-icons/io5";
import { BsBank } from "react-icons/bs";
import { BiDetail, BiTargetLock } from "react-icons/bi";
import { GoGraph } from "react-icons/go";
import { IoChatboxOutline } from "react-icons/io5";
import { IoIosSearch, IoIosCheckmarkCircleOutline } from "react-icons/io";
import { FaRegLightbulb } from "react-icons/fa6";
import { GrMenu } from "react-icons/gr";
import { FaProjectDiagram, FaHammer } from "react-icons/fa";
import { SlRocket } from "react-icons/sl";
import { RiWechat2Line } from "react-icons/ri";
import { VscFeedback } from "react-icons/vsc";
import { MdSupportAgent } from "react-icons/md";

const mainSectionItems = [
  { icon: <BiDetail />, text: "Overview" },
  { icon: <IoChatboxOutline />, text: "Chats" },
  { icon: <BsBank />, text: "Central Context Bank" },
];

const phasesSectionItems = [
  { icon: <IoIosSearch />, text: "Identify a need" },
  { icon: <IoIosCheckmarkCircleOutline />, text: "Validate the need" },
  { icon: <FaRegLightbulb />, text: "Solution ideation" },
  { icon: <BiTargetLock />, text: "Audience Targeting" },
  { icon: <GoGraph />, text: "Market validation" },
  { icon: <GrMenu />, text: "Define MVP Features" },
  { icon: <FaProjectDiagram />, text: "Plan MVP Development" },
  { icon: <FaHammer />, text: "Build MVP" },
  { icon: <SlRocket />, text: "Plan MVP Launch" },
  { icon: <RiWechat2Line />, text: "Post-launch actions" },
];

const otherSectionItems = [
  { icon: <MdSupportAgent />, text: "Support" },
  { icon: <VscFeedback />, text: "Feedback" },
];

const Sidebar = () => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  return (
    <section className="w-[340px] min-h-screen h-full flex flex-col bg-ivory-100 shadow-md relative">
      <div className="p-4 flex justify-between">
        <h2 className="text-primary font-semibold text-xl">Makerhub</h2>
        <div className="flex items-center">
          <div className="flex items-center justify-center align w-6 h-6 rounded-full border border-2 text-primary font-bold text-sm">
            5
          </div>
        </div>
      </div>
      <div
        className="px-2 rounded-md text-darkCharcoal font-medium bg-lightBg hover:bg-darkBg transition cursor-pointer h-10 mx-2 flex flex-row justify-between items-center"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <span>first project</span>
        <div className={`transition ${showDropdown ? "rotate-180" : ""}`}>
          {<IoChevronDownOutline />}
        </div>
      </div>
      <div className="absolute top-[6.5rem]">
        {showDropdown && <ProjectDropdown />}
      </div>
      <div className="max-h-[700px] overflow-y-auto">
        <Menu heading="Main" items={mainSectionItems} />
        <Menu heading="Phases" items={phasesSectionItems} />
        <Menu heading="Other" items={otherSectionItems} />
      </div>
    </section>
  );
};

export default Sidebar;
