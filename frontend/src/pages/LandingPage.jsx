import { Link } from 'react-router';

export default function LandingPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 p-4">
            <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                Welcome to trackNdo
            </h1>
            <p className="mb-6 text-gray-600 dark:text-gray-300">
                Organize your tasks, boards at one place.
            </p>
            <Link
                to="/sign-in"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
                Sign In / Sign Up
            </Link>
        </div>
    );
}
