import { Trash2Icon } from "lucide-react";
import { useState } from "react";
import { deleteTaskApi, updateTaskApi } from "../../services/taskService.js";
import toast from "react-hot-toast";

export default function TaskCard({ task, onDeleteTask }) {
    const [completed, setCompleted] = useState(task.completed || false)

    // Toggle handler
    // const toggle = () => setCompleted(prev => !prev)
    async function toggleComplete(e) {
        e.stopPropagation()
        const newStatus = !completed;
        setCompleted(newStatus)
        try {
            await updateTaskApi(task._id, { completed: newStatus })
            toast.success(
                `${newStatus ? "✅ Completed" : "↩️ Marked incomplete"} – ${task.title}`
            );
        } catch (error) {
            toast.error("Failed to update task status")
            console.error("Failed to update task status", err);
            setCompleted(task.completed)
        }
    }

    async function deleteTask(e) {
        e.preventDefault()
        console.log('clicked')
        onDeleteTask(task._id)
    }

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
            >
                {/* Checkbox */}
                <input
                    type="checkbox"
                    checked={completed}
                    onChange={toggleComplete}
                    className="mt-1 h-5 w-5 text-blue-600 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 dark:focus:ring-blue-300 transition-colors duration-200"
                />

                {/* Content */}
                <div className="flex-1 flex flex-col space-y-1 "
                    onClick={toggleComplete}
                    style={{ opacity: completed ? 0.6 : 1 }}

                >
                    <p className={`text-lg font-medium mb-1 text-gray-800 dark:text-gray-100 ${completed ? 'line-through' : ''}`}>
                        {task.title}
                    </p>
                    <p className={`text-sm font-medium text-gray-600 dark:text-gray-300 ${completed ? 'line-through' : ''}`}>
                        {task.description}
                    </p>
                </div>
                <button className="cursor-pointer" onClick={deleteTask}>
                    <Trash2Icon className="h-5 w-5 text-red-500 hover:text-red-600 transition-colors duration-200" />
                </button>
            </div>

        </div>
    );
};
