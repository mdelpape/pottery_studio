import React from 'react';

export default function ProjectCard({ Element }) {

  return (
    <button className="relative w-32 h-32 bg-white bg-opacity-30 rounded-xl backdrop-blur-sm hover:bg-opacity-20  ">
      <text className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-white text-center">
        {Element ? Element : "No Name"}
      </text>

    </button>
  )
}
