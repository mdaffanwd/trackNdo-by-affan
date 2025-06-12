import { Trash2Icon } from "lucide-react";
import { useState } from "react";

export default function TaskCard({ task }) {
    const [completed, setCompleted] = useState(false)

    // Toggle handler
    const toggle = () => setCompleted(prev => !prev)

    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 mb-4 last:mb-0 transition-colors duration-200">
            {/* Priority Tag */}
            {/* The priority tag styling will now be generic or needs to be provided elsewhere */}
            <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 mb-3">
                {task.priority}
            </span>

            <div
                className="card flex items-start gap-4 cursor-pointer"
                // Optional: dim out or strike-through when completed
                style={{ opacity: completed ? 0.6 : 1 }}
            >
                {/* Checkbox */}
                <input
                    type="checkbox"
                    checked={completed}
                    onChange={toggle}
                    // prevent the onClick on the parent firing twice
                    onClick={e => e.stopPropagation()}
                    className="mt-1 h-5 w-5 text-blue-600 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 dark:focus:ring-blue-300 transition-colors duration-200"
                />

                {/* Content */}
                <div className="flex-1 flex flex-col space-y-1 "
                    onClick={toggle}
                >
                    <p className={`text-lg font-medium mb-1 text-gray-800 dark:text-gray-100 ${completed ? 'line-through' : ''}`}>
                        {task.title}
                    </p>
                    <p className={`text-sm font-medium text-gray-600 dark:text-gray-300 ${completed ? 'line-through' : ''}`}>
                        {task.description}
                    </p>
                </div>
                <Trash2Icon className="h-5 w-5 text-red-500 hover:text-red-600 transition-colors duration-200" />
            </div>

        </div>
    );
};
