"use client";
import { useState } from "react";
import Link from "next/link";
import ProjectCard from "@/components/2d/ProjectCard.js";

export default function SideBar() {
  const [location, setLocation] = useState('planetary_system');
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
    window.location.href = `/${e.target.value}`;
  };

  return (
    <>
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
            <Link href="/earth">
              <ProjectCard Element={"Earth"} />
            </Link>
            <Link href="/city_head">
              <ProjectCard Element={"City Head"} />
            </Link>
            <Link href="/">
              <ProjectCard Element={"Planetary system"} />
            </Link>
            <Link href="/shader">
              <ProjectCard Element={"Shader"} />
            </Link>
          </div>
        )}
      </div>
      {/* <div className="absolute top-2 left-2 z-50">
        <select value={location} onChange={handleLocationChange}>
          <option value={'upload'}>Upload</option>
          <option value={'chunk'}>Chunk</option>
          <option value={'house'}>Minecraft House</option>
          <option value={'flow_field_animation'}>Flow Field</option>
          <option value={'earth'}>Earth</option>
          <option value={'city_head'}>City Head</option>
          <option value={'planetary_system'}>Planetary system</option>
        </select>
      </div> */}
    </>
  );
}
