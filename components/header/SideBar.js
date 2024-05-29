"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import ProjectCard from "@/components/2d/ProjectCard.js";
import dynamic from 'next/dynamic';
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useControls } from 'leva';

export default function SideBar() {
  const router = useRouter()
  const pathname = usePathname()
  const [location, setLocation] = useState(
    'planetary_system'
  );
  const [isOpen, setIsOpen] = useState(false);
  console.log(pathname)
  //set the current location
useEffect(() => {
  const path = pathname.split('/')[1];
  setLocation(path || 'planetary_system');
}, [pathname]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  //get location from url
  const handleLocationChange = (e) => {
    setLocation(e.target.value);
    router.push(`/${e.target.value}`);
  };

  return (
      <div className="absolute top-2 left-2 z-50">
        <select value={location} onChange={handleLocationChange}
          className="p-2 bg-gray-800 text-white rounded"
        >
          <option value={'upload'}>Upload</option>
          <option value={'chunk'}>Chunk</option>
          <option value={'flow_field_animation'}>Flow Field</option>
          <option value={'earth'}>Earth</option>
          <option value={'city_head'}>City Head</option>
          <option value={'point_cloud'}>Planetary System</option>
          <option value={'shader'}>Shader</option>
        </select>
      </div>
  );
}
