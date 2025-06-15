import { LogIn } from "lucide-react";

export default function AuthPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg dark:shadow-2xl transition-colors duration-300">
                {/* Logo / App Name */}
                <div className="mb-6 text-center">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Welcome to TaskBoard</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Sign in to continue</p>
                </div>

                {/* Google Sign In Button */}
                <button
                    className="w-full flex items-center justify-center gap-1 py-3 px-4 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm hover:shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-200"
                >
                    <img
                        src="https://cdn.pixabay.com/photo/2015/12/11/11/43/google-1088004_1280.png"
                        alt="Google Logo"
                        className="h-5 w-5 brightness-125"
                    />
                    <span className="text-gray-700 dark:text-gray-200 font-medium">Sign in with Google</span>
                </button>

                {/* Divider */}
                <div className="flex items-center gap-4 my-6">
                    <div className="flex-grow h-px bg-gray-300 dark:bg-gray-600" />
                    <span className="text-gray-500 dark:text-gray-400 text-sm">OR</span>
                    <div className="flex-grow h-px bg-gray-300 dark:bg-gray-600" />
                </div>

                {/* Email login - Optional Placeholder */}
                <div className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email address"
                        disabled
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                    />
                    <button
                        disabled
                        className="w-full py-3 px-4 flex items-center justify-center bg-blue-500/50 text-white rounded-lg shadow hover:bg-blue-600/50 transition disabled:opacity-50 cursor-not-allowed"
                    >
                        <LogIn className="w-4 h-4 mr-2" />
                        Email login coming soon
                    </button>
                </div>
            </div>
        </div>
    );
}
