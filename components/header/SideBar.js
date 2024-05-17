'use client'
import Link from 'next/link';
import portfolio from '@/public/assets/profile.jpeg'
import profile from '@/public/assets/BD65E39F-6691-4C78-9843-896CC917640B_1_105_c.jpeg'
import ProjectCard from '@/components/2d/ProjectCard.js';
import Vase1 from '@/components/3d/Vase1.js';
import Vase2 from '@/components/3d/Vase2.js';
import Vase5 from '@/components/3d/Vase5.js';


export default function SideBar() {

  return (
    <div className="absolute  m-5 flex flex-col gap-5 items-center z-50">
      {/* <Link href="/raining_pottery">
        <ProjectCard Element={'Raining Pots'} />
      </Link> */}
      <Link href="/upload">
        <ProjectCard Element={'Upload'} />
      </Link>
      <Link href="/chunk">
        <ProjectCard Element={'Chunk'} />
      </Link>
      <Link href="/house">
        <ProjectCard Element={'Minecraft House'} />
      </Link>
      <Link href="/flow_field_animation">
        <ProjectCard Element={'Flow Field'} />
      </Link>
      <Link href="/earth">
        <ProjectCard Element={'Earth'} />
      </Link>
      <Link href="/city_head">
        <ProjectCard Element={'City Head'} />
      </Link>
      <Link href="/point_cloud">
        <ProjectCard Element={'Point Cloud'} />
      </Link>
    </div>
  );
}