import Link from 'next/link';
import portfolio from '@/public/assets/profile.jpeg'
import profile from '@/public/assets/BD65E39F-6691-4C78-9843-896CC917640B_1_105_c.jpeg'

export default function Header() {

  return (
    <div className='
      flex flex-row
      justify-between
      items-center
      bg-slate-400
      p-2
      rounded-xl
      w-full
      h-20
      absolute
      '>
      {/* <img className="w-10 h-10" src={
        "../../public/assets/BD65E39F-6691-4C78-9843-896CC917640B_1_105_c.jpeg"
      } /> */}

      <div className="text-3xl md:text-2xl sm:text-2xl font-bold text-slate-700 bg-slate-400 rounded-xl p-1 truncate">
        Portfolio Spotlight
      </div>

      <Link href="/test_route">
        <button className=" hover:bg-gray-400 font-bold py-2 px-4 rounded bg-gray-300 text-black">
          More
        </button>
      </Link>

    </div>
  );
}