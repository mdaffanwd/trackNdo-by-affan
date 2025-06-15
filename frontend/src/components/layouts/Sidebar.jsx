import { useState } from 'react';
import {
    ListTodo,
    Settings,
    ClipboardList,
    Home,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import { useSidebar } from '../../context/SidebarContext.jsx';


const navItems = [
    { name: 'Dashboard', icon: Home },
    { name: 'Tasks', icon: ListTodo },
    { name: 'Manage', icon: Settings },
    { name: 'Report', icon: ClipboardList },
];

export default function Sidebar() {
    const { fullSidebar, toggleFullSidebar, isMobileSidebarOpen, toggleMobileSidebar } = useSidebar();

    const [activeItem, setActiveItem] = useState('Tasks');

    const shouldBeFull = fullSidebar || isMobileSidebarOpen;

    function handleLinkClick(item) {
        return function (e) {
            e.preventDefault();
            setActiveItem(item.name);
            if (toggleMobileSidebar) toggleMobileSidebar(false);
        };
    }
    return (
        <aside
            className={`sticky px-2 top-0 h-screen bg-white dark:bg-gray-800 shadow-2xl transition-all duration-300 flex flex-col ${shouldBeFull ? 'w-56' : 'w-fit'}`}
        >
            {/* Logo + desktop toggle */}
            <div className="flex items-center justify-between p-4">
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
                        : <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-300" />
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
            <nav className="flex-1 overflow-y-auto">
                <ul>
                    {navItems.map((item) => (
                        <li key={item.name} className="mb-2">
                            <a
                                href="#"
                                onClick={handleLinkClick(item)}
                                className={`flex items-center gap-2 p-3 rounded-xl transition-colors duration-200 
                                    ${activeItem === item.name
                                        ? 'bg-blue-100 text-blue-700 font-semibold dark:bg-blue-900 dark:text-blue-300'
                                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
                                    }`}
                            >
                                <item.icon className="h-5 w-5" />
                                {shouldBeFull && <span className="text-lg">{item.name}</span>}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Always show desktop toggle at bottom on desktop */}
            <div className="p-4 hidden sm:block">
                <button
                    onClick={toggleFullSidebar}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
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
