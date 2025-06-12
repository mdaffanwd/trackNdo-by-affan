import { useState } from 'react';
import {
  ListTodo,
  Settings,
  ClipboardList,
  Home,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState('Tasks');
  const [isOpen, setIsOpen] = useState(true);

  const navItems = [
    { name: 'Dashboard', icon: Home, path: '/dashboard' },
    { name: 'Tasks', icon: ListTodo, path: '/tasks' },
    { name: 'Manage', icon: Settings, path: '/manage' },
    { name: 'Report', icon: ClipboardList, path: '/report' },
  ];

  return (
    <aside
      className={`
        sticky top-0 h-screen bg-white dark:bg-gray-900 shadow-2xl 
        transition-all duration-300 flex flex-col
        ${isOpen ? 'w-60' : 'w-16'}
      `}
    >
      {/* Logo */}
      <div className={`flex items-center justify-center p-4`}>
        <img
          src="./public/trackNdo.jpeg"
          alt="logo"
          className={`h-10 transition-opacity duration-300 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto">
        <ul>
          {navItems.map((item) => (
            <li key={item.name} className="mb-2">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveItem(item.name);
                }}
                className={`
                  flex items-center p-3 rounded-xl transition-all duration-200 ease-in-out
                  ${
                    activeItem === item.name
                      ? 'bg-blue-100 text-blue-700 font-semibold shadow-inner dark:bg-blue-900 dark:text-blue-300'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-blue-400'
                  }
                `}
              >
                <item.icon
                  className={`
                    h-5 w-5 transition-colors duration-200 ease-in-out
                    ${
                      activeItem === item.name
                        ? 'text-blue-600'
                        : 'text-gray-500 group-hover:text-blue-500'
                    }
                  `}
                />
                {isOpen && <span className="ml-3 text-lg">{item.name}</span>}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Toggle Button */}
      <div className="p-4">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex items-center justify-center w-full p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          {isOpen ? (
            <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          ) : (
            <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          )}
        </button>
      </div>
    </aside>
  );
}
