import Link from 'next/link';

export default function Header() {

  return (
    <div className={
      "bg-gray-100 text-gray-900 flex justify-center items-center h-12 gap-10"
    }>
      <Link href="/">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Go to Home
        </button>
      </Link>
      <Link href="/test_route">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Go to Test Route
        </button>
      </Link>
    </div>
  );
}