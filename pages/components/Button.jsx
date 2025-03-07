import Link from "next/link";

export default function Button({ href, text, onClick }) {
  return (
    <Link href={href}>
      <button
        onClick={onClick}
        className="bg-teal-600 hover:bg-teal-500 text-white px-8 py-4 text-2xl rounded-lg transition-transform hover:scale-105 cursor-pointer"
      >
        {text}
      </button>
    </Link>
  );
}
