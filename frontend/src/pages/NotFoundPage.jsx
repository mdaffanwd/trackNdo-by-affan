import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100 dark:bg-gray-900">
      <h2 className="text-3xl font-bold mb-2 text-gray-800 dark:text-gray-100">
        404 — Page Not Found
      </h2>
      <p className="mb-4 text-gray-600 dark:text-gray-300">
        Oops! We can’t find what you’re looking for.
      </p>
      <Link
        to="/home"
        className="text-blue-600 hover:underline dark:text-blue-400"
      >
        Return to Home
      </Link>
    </div>
  );
}
