import { useState } from 'react';
import { ListTodo, Settings, ClipboardList, Home, ChevronLeft, ChevronRight } from 'lucide-react';
import { useSidebar } from '../../context/SidebarContext.jsx';

export default function Sidebar() {
    const { fullSidebar, toggleFullSidebar } = useSidebar()

    const [activeItem, setActiveItem] = useState('Tasks'); // State to manage the active menu item

    // Define the sidebar navigation items
    const navItems = [
        { name: 'Dashboard', icon: Home, path: '/dashboard' },
        { name: 'Tasks', icon: ListTodo, path: '/tasks' },
        { name: 'Manage', icon: Settings, path: '/manage' },
        { name: 'Report', icon: ClipboardList, path: '/report' },
    ];

    return (
        <aside className={`${fullSidebar ? 'w-56' : 'w-fit'} p-2.5 block sticky top-0 h-screen shadow-2xl dark:bg-gray-900 dark:shadow-2xl transition-colors duration-300 `}>
            {/* Logo Section */}
            <div className="flex justify-between items-center rounded-3xl mb-4 mt-2 ">
                <img
                    src={fullSidebar ? "/trackNdo.jpeg" : "/trackNdo-cropped.jpeg"}
                    alt="logo"
                    className="h-10 block dark:bg-blend-multiply"
                />
                <button
                    onClick={toggleFullSidebar}
                    className={`${!fullSidebar ? " ml-2  mr-2" : ""} p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition`}
                >
                    {fullSidebar ? (
                        <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                    ) : (
                        <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                    )}
                </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col items-center flex-1">
                <ul>
                    {navItems.map((item) => (
                        <li key={item.name} className="mb-2">
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setActiveItem(item.name);
                                }}
                                className={`flex items-center gap-2 p-3 rounded-xl transition-all duration-200 ease-in-out group
                    ${activeItem === item.name
                                        ? 'bg-blue-100 text-blue-700 font-semibold shadow-inner dark:bg-blue-900 dark:text-blue-300'
                                        : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-blue-400'
                                    }
                  `}
                            >
                                <item.icon
                                    className={`h-5 w-5 transition-colors duration-200 ease-in-out ${activeItem === item.name
                                        ? 'text-blue-600'
                                        : 'text-gray-500 group-hover:text-blue-500'
                                        }`}
                                />
                                {fullSidebar && <span className="text-lg">{item.name}</span>}
                            </a>
                        </li>
                    ))}
                </ul>
                {/* Toggle Button */}
                <button
                    onClick={toggleFullSidebar}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                    {fullSidebar ? (
                        <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                    ) : (
                        <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                    )}
                </button>
            </nav>
        </aside>
    );
}
