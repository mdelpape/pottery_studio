"use client";
import { useState } from "react";
import Link from "next/link";
import ProjectCard from "@/components/2d/ProjectCard.js";

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
      <div className="absolute m-2 flex flex-col items-center z-50 w-32">
        <button
          onClick={toggleDropdown}
          className="bg-gray-800 text-white px-4 py-2 rounded"
        >
          Menu
        </button>
        {isOpen && (
          <div className="mt-2 flex flex-col gap-3 bg-gray-800 p-4 rounded shadow-lg">
            <Link href="/upload">
              <ProjectCard Element={"Upload"} />
            </Link>
            <Link href="/chunk">
              <ProjectCard Element={"Chunk"} />
            </Link>
            <Link href="/house">
              <ProjectCard Element={"Minecraft House"} />
            </Link>
            <Link href="/flow_field_animation">
              <ProjectCard Element={"Flow Field"} />
            </Link>
            <Link href="/">
              <ProjectCard Element={"Earth"} />
            </Link>
            <Link href="/city_head">
              <ProjectCard Element={"City Head"} />
            </Link>
            <Link href="/point_cloud">
              <ProjectCard Element={"Point Cloud"} />
            </Link>
          </div>
        )}
      </div>
  );
}
