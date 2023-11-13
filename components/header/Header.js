import Link from 'next/link';

export default function Header() {

  return (
    <div className={
      " text-gray-900 flex justify-center items-center h-12 gap-10"
    }>
      <Link href="/">
        <button className=" hover:bg-gray-400 font-bold py-2 px-4 rounded bg-gray-300 text-black">
          Home
        </button>
      </Link>
      <Link href="/test_route">
        <button className=" hover:bg-gray-400 font-bold py-2 px-4 rounded bg-gray-300 text-black">
          Pottery Classes
        </button>
      </Link>
      <Link href="/test_route">
        <button className=" hover:bg-gray-400 font-bold py-2 px-4 rounded bg-gray-300 text-black">
          Open Studio
        </button>
      </Link>
      <Link href="/test_route">
        <button className=" hover:bg-gray-400 font-bold py-2 px-4 rounded bg-gray-300 text-black">
          More
        </button>
      </Link>
    </div>
  );
}