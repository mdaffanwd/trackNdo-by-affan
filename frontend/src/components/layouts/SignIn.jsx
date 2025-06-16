import { useState } from "react";

export default function SignIn() {
    const [form, setForm] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log("Sign In with:", form);
    };

    return (
        <div className="pt-3 flex items-center justify-center transition-colors duration-300">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
                    Sign in to your account
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Email address
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                            placeholder="••••••••"
                        />
                    </div>

                    <div className="flex justify-between items-center">
                        <label className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                            <input type="checkbox" className="mr-2" /> Remember me
                        </label>
                        <a href="#" className="text-sm text-blue-600 hover:underline dark:text-blue-400">
                            Forgot password?
                        </a>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow transition"
                    >
                        Sign In
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                    Don't have an account?{" "}
                    <a href="#" className="text-blue-600 hover:underline dark:text-blue-400">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
}
