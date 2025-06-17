import { NavLink, useNavigate } from 'react-router';

import {
    ListTodo,
    Settings,
    ClipboardList,
    Home,
    ChevronLeft,
    ChevronRight,
    LogOut
} from 'lucide-react';
import { useSidebar } from '../../context/SidebarContext.jsx';
import toast from 'react-hot-toast';
import { useGoogleAuth } from '../../context/GoogleAuthContext.jsx';


const navItems = [
    { name: 'Tasks', icon: ListTodo, to: '/home' },
    { name: 'Dashboard', icon: Home, to: '/dashboard' },
    { name: 'Manage', icon: Settings, to: '/manage' },
    { name: 'Report', icon: ClipboardList, to: '/report' },
];

export default function Sidebar() {
    const { fullSidebar, toggleFullSidebar, isMobileSidebarOpen, toggleMobileSidebar } = useSidebar();
    const { user, googleAuthLogout, isAuthenticated } = useGoogleAuth();

    const navigate = useNavigate()

    const shouldBeFull = fullSidebar || isMobileSidebarOpen;

    async function handleGoogleAuthLogout() {
        try {
            await googleAuthLogout();
            toast.success("logged out successfully")
            navigate('/login', { replace: true });

        } catch (error) {
            toast.error("error whilte logging out!!")
        }
    }

    return (
        <aside
            className={`sticky px-2 top-0 h-screen bg-white dark:bg-gray-700 shadow-2xl transition-all duration-300 flex flex-col ${shouldBeFull ? 'w-52' : 'w-fit'}`}
        >
            {/* Logo + desktop toggle */}
            <div className="flex items-center justify-between pt-4 pl-2">
                <img
                    src={fullSidebar ? '/trackNdo.jpeg' : '/trackNdo-cropped.jpeg'}
                    alt="logo"
                    className="h-8"
                />
                <button
                    onClick={toggleFullSidebar}
                    className="hidden sm:block p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                    {shouldBeFull
                        ? <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                        : <ChevronRight className="h-5 w-5 ml-2 text-gray-600 dark:text-gray-300" />
                    }
                </button>
                {/* Mobile close button */}
                <button
                    onClick={toggleMobileSidebar}
                    className="sm:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                    <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 overflow-y-auto mt-4">
                <ul>
                    {navItems.map(({ name, icon: Icon, to }) => (
                        <li key={name} className="mb-2">
                            <NavLink
                                to={to}
                                className={({ isActive }) =>
                                    `flex  gap-2 p-3 rounded-xl transition-colors duration-200
                                ${isActive ?
                                        'bg-blue-100 text-blue-700 font-semibold dark:bg-blue-900 dark:text-blue-300'
                                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
                                    }`
                                }
                            >
                                <Icon className="h-5 w-5" />
                                {shouldBeFull && <span className="text-lg">{name}</span>}
                            </NavLink>
                        </li>
                    ))}
                </ul>
                {isAuthenticated && <button
                    onClick={handleGoogleAuthLogout}
                    className="w-full flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-800 rounded-lg transition"
                >
                    <LogOut className="w-5 h-5" />
                    {shouldBeFull && 'Logout'}
                </button>}
            </nav>

            {/* Always show desktop toggle at bottom on desktop */}
            <div className="p-4 hidden sm:block">
                <button
                    onClick={toggleFullSidebar}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                    {fullSidebar
                        ? <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                        : <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                    }
                </button>
            </div>
        </aside>
    );
}
