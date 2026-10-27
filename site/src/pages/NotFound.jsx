import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 bg-gray-100 px-4 py-24 text-center text-[#1F3A12]">
      <p className="text-7xl font-extrabold text-[#C9A227]">404</p>
      <h1 className="text-2xl font-bold">Page not found</h1>
      <p className="max-w-md">
        The page you are looking for does not exist or may have moved.
      </p>
      <Link
        to="/"
        className="mt-2 rounded bg-[#1F3A12] px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#C9A227]"
      >
        Back to home
      </Link>
    </section>
  );
}
