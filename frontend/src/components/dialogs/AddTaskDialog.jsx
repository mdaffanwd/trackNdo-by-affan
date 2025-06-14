import { useState } from "react";

export default function AddTaskDialog({ setIsAddTaskOpen, onCreateTask }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: ""
  });

  const { title, description, priority } = formData;

  function handleFormChange(e) {
    setFormData(formData => ({
      ...formData,
      [e.target.name]: e.target.value
    }));
  }

  function handleAddTask() {
    onCreateTask(formData);
    setIsAddTaskOpen(false);
  }

  return (
    <div className=" fixed inset-0 bg-black/50 flex items-center justify-center z-30">
      <div className="bg-white dark:bg-gray-800 dark:text-white rounded-2xl shadow-lg p-4 w-full max-w-sm">
        <h2 className="text-xl font-semibold mb-4">Create New Task</h2>
        <form onSubmit={handleAddTask}>
          <label className="block text-sm font-medium">Title:</label>
          <input
            type="text"
            placeholder="Task title"
            name="title"
            value={title}
            onChange={handleFormChange}
            autoFocus
            className="w-full outline-none p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300 mb-4"
          />

          <label className="block text-sm font-medium">Description:</label>
          <textarea
            placeholder="Task description"
            name="description"
            value={description}
            onChange={handleFormChange}
            className="w-full outline-none p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300 mb-4"
          />

          <label className="block text-sm font-medium">Priority</label>
          <select
            name="priority"
            value={priority}
            onChange={handleFormChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-300">
            <option value="" disabled>
              Select priority
            </option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsAddTaskOpen(false)}
              className="px-4 py-2 rounded-md text-gray-600 dark:text-gray-400 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
