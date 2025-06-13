import { MenuIcon, Moon, Search, Sun, User } from 'lucide-react'
import useDarkMode from '../../hooks/useDarkMode.js'
import { useSidebar } from '../../context/SidebarContext.jsx';

export default function Header() {
    const { toggleMobileSidebar } = useSidebar()
    const [isDark, toggleDarkMode] = useDarkMode()


    return (
        <header className="sticky top-0 z-20 bg-white shadow-sm px-6 py-4 flex items-center justify-between dark:bg-gray-800 dark:text-gray-200 transition-colors duration-300">
            {/* Center: Search bar */}

            <button className='md:hidden' onClick={toggleMobileSidebar} >
                <MenuIcon />
            </button>

            <div className="relative flex-1 max-w-lg mx-6">
                <input
                    type="text"
                    placeholder="Search boards, tasks..."
                    className="w-full pl-2 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:placeholder-gray-500 dark:focus:ring-blue-600" />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
            </div>

            <div className='flex justify-center items-center gap-6'>
                <button onClick={toggleDarkMode} className='p-2 hover:bg-gray-200 rounded-full transition dark:hover:bg-gray-700 dark:text-gray-200'>
                    {isDark ? <Sun /> : <Moon className="text-gray-600 dark:text-gray-300" />}
                </button>
                {/* Right: User icon/avatar */}
                <button className="flex items-center justify-center p-2 bg-indigo-100 hover:bg-indigo-200 rounded-full transition dark:bg-indigo-800 dark:hover:bg-indigo-700 dark:text-gray-200">
                    {/* Circular avatar with light background */}
                    {/* <div className="h-10 w-10 rounded-full overflow-hidden"> */}
                    {/* <img
                        src={avatarUrl}
                        alt={`${userName}’s avatar`}
                        className="h-full w-full object-cover"
                    /> */}
                    <User className="h-8 w-8 text-gray-500 dark:text-gray-300" />

                </button>
            </div>
        </header>
    )
}
