import { MenuIcon, Moon, Search, Sun, User } from 'lucide-react'
import useDarkMode from '../../hooks/useDarkMode.js'
import { useSidebar } from '../../context/SidebarContext.jsx';
import { useGoogleAuth } from '../../context/GoogleAuthContext.jsx';

export default function Header() {
    const { toggleMobileSidebar } = useSidebar()
    const [isDark, toggleDarkMode] = useDarkMode()
    const { user, isAuthenticated } = useGoogleAuth();

    return (
        <header className="sticky top-0 z-20 bg-white shadow-sm px-6 py-4 flex items-center justify-between dark:bg-gray-800 dark:text-gray-200 transition-colors duration-300">
            {/* Center: Search bar */}

            <button className='sm:hidden' onClick={toggleMobileSidebar} >
                <MenuIcon />
            </button>

            <div className="relative flex-1 max-w-lg mx-6">
                <input
                    type="text"
                    placeholder="Search boards, tasks..."
                    className="w-full pl-2 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:placeholder-gray-500 dark:focus:ring-blue-600" />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
            </div>

            <div className='flex justify-center items-center gap-2 sm:gap-4 '>
                <button onClick={toggleDarkMode} className='p-2 hover:bg-gray-200 rounded-full transition dark:hover:bg-gray-700 dark:text-gray-200'>
                    {isDark ? <Sun /> : <Moon className="text-gray-600 dark:text-gray-300" />}
                </button>

                {isAuthenticated && user?.avatar ? (
                    <img
                        src={user.avatar}
                        alt={user.name || user.email}
                        className="w-8 h-8 rounded-full border-2 border-gray-300 dark:border-gray-700 cursor-pointer"
                    />
                ) : (
                    <User className="h-4 w-4 sm:h-8 sm:w-8 text-gray-500 dark:text-gray-300" />
                )}
            </div>
        </header>
    )
}
