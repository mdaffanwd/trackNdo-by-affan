import { LogIn, Moon, Sun } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";
import { useGoogleAuth } from "../context/GoogleAuthContext.jsx";

import useDarkMode from "../hooks/useDarkMode.js";
import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";

export default function AuthPage() {
    const { error, isAuthenticated, googleAuthLogin } = useGoogleAuth();
    const [isDark, toggleDarkMode] = useDarkMode();

    const navigate = useNavigate();
    // sending back from where they came.
    const { state } = useLocation();
    const from = state?.from?.pathname || '/home';

    console.log("isAuthenticated:", isAuthenticated);

    useEffect(() => {
        if (isAuthenticated) {
            navigate(from, { replace: true });
        }
    }, [isAuthenticated, navigate, from]);

    return (
        <div className="relative min-h-screen max-w-7xl mx-auto bg-gradient-to-br from-gray-100 via-white to-gray-700 dark:from-gray-900 dark:via-gray-500 dark:to-gray-600 flex justify-center items-center px-4">

            {/* ✅ Dark Mode Toggle - Top Right */}
            <button
                onClick={toggleDarkMode}
                className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white transition-colors duration-300"
                aria-label="Toggle Dark Mode"
            >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Auth Card */}
            <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg dark:shadow-2xl transition-colors duration-300">

                {/* Logo / App Name */}
                <div className="mb-6 text-center">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                        Welcome to trackNdo
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Sign in to continue
                    </p>
                </div>

                {/* Google Sign In Button */}
                <div>
                    <GoogleLogin
                        onSuccess={credentialResponse => {
                            const idToken = credentialResponse.credential;
                            // 📤 sending just the string to API
                            googleAuthLogin(idToken);
                        }}
                        onError={() => {
                            console.error('Google Login Failed');
                        }}
                    />
                </div>

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
