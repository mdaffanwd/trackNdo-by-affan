import React from 'react';

export default function AddTaskDialog({ setIsAddTaskOpen }) {
  function handleAddTask(e) {
    e.preventDefault();
    console.log('Form submitted');
    setIsAddTaskOpen(false);
  }

  return (
    <div className=" dark:bg-red-300 fixed inset-0 bg-black/50 flex items-center justify-center z-30">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm">
        <h2 className="text-xl font-semibold mb-4">Create New Task</h2>
        <form onSubmit={handleAddTask}>
          <label className="block text-sm font-medium">Title:</label>
          <input
            type="text"
            placeholder="Task title"
            className="w-full outline-none p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300 mb-4"
          />

          <label className="block text-sm font-medium">Description:</label>
          <textarea
            placeholder="Task description"
            className="w-full outline-none p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300 mb-4"
          />

          <label className="block text-sm font-medium">Priority</label>
          <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-300">
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsAddTaskOpen(false)}
              className="px-4 py-2 rounded-md text-gray-600 hover:bg-gray-100 transition"
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
