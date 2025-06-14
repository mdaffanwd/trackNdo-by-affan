import { Edit, MoreVertical, Plus, Save } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import TaskCard from './TaskCard.jsx';
import OptionButtons from './OptionButtons.jsx';
import AddTaskDialog from '../dialogs/AddTaskDialog.jsx';
import toast from 'react-hot-toast';
import { createTaskApi, deleteTaskApi } from '../../services/taskService.js';

export default function Board({
  title,
  handleDeleteBoard,
  boardId,
  handleRenameBoard,
  initialTasks,
}) {
  const btnRef = useRef();
  const menuRef = useRef();
  const inputRef = useRef();

  const [openOptions, setOpenOptions] = useState(false);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editBoardTitle, setEditBoardTitle] = useState("");
  const [tasks, setTasks] = useState(
    initialTasks.map(task => ({ ...task, id: task._id }))
  );

  useEffect(() => { }, [])
  // ✅ JUST OPENS THE DIALOG
  function openAddTaskDialog(e) {
    console.log(e.key)
    setOpenOptions(false);
    setIsAddTaskOpen(true);
  }

  // ✅ CREATES A NEW TASK
  async function handleCreateTask(formData) {
    try {
      const payload = { ...formData, board: boardId };
      const newTask = await createTaskApi(payload);

      setTasks(prevTasks => [
        ...prevTasks,
        {
          id: newTask._id,
          title: newTask.title,
          description: newTask.description,
          priority: newTask.priority,
        }
      ]);

      toast.success("Task added successfully");
    } catch (error) {
      console.log(error);
      toast.error("🚨 Failed to create task");
    }
  }

  function handleDelete() {
    handleDeleteBoard(boardId);
  }

  function handleEditClick() {
    setIsEditing(true);
    setEditBoardTitle(title);
  }

  function handleSaveChangedTitle() {
    const trimmed = editBoardTitle.trim();
    if (trimmed && trimmed !== title) {
      handleRenameBoard(boardId, trimmed);
    }
    setIsEditing(false);
    setEditBoardTitle(trimmed || title);
  }

  async function handleDeleteTask(taskId) {
    try {
      // 1. Call API
      await deleteTaskApi(taskId);
      setTasks(allTasks => allTasks.filter(task => task.id !== taskId));
      // 2. Remove from local state
      toast.success("Task deleted");
    } catch (err) {
      console.error("Failed to delete task:", err);
      toast.error("🚨 Could not delete task");
    }
  }

  useEffect(() => {
    function onDocClick(e) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        btnRef.current &&
        !btnRef.current.contains(e.target)
      ) {
        setOpenOptions(false);
      }
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  useEffect(() => {
    if (isEditing) inputRef.current?.focus();
  }, [isEditing]);

  return (
    <>
      {isAddTaskOpen && (
        <AddTaskDialog
          setIsAddTaskOpen={setIsAddTaskOpen}
          onCreateTask={handleCreateTask}
        />
      )}

      <div className="flex-grow p-4 bg-gray-50 dark:bg-gray-800 border-t-4 border-t-red-800 rounded-2xl shadow-xl transition-colors duration-300 dark:shadow-2xl dark:shadow-gray-800">
        <div className="flex items-center justify-between p-5 bg-white dark:bg-gray-700 border-b-2 border-gray-400 dark:border-gray-600 rounded-t-2xl transition-colors duration-300">
          <div className='flex items-center gap-2'>
            {isEditing ? (
              <input
                type="text"
                ref={inputRef}
                value={editBoardTitle}
                onChange={(e) => setEditBoardTitle(e.target.value)}
                onBlur={handleSaveChangedTitle}
                onKeyDown={(e) => e.key === 'Enter' && handleSaveChangedTitle()}
                className="w-full px-3 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:focus:ring-blue-400 transition duration-200"
              />
            ) : (
              <h2 className="w-fit text-2xl font-bold text-gray-800 dark:text-gray-100">{title}</h2>
            )}

            {isEditing ? (
              <Save onClick={handleSaveChangedTitle} className='opacity-50 hover:opacity-100 transition duration-300 dark:text-gray-100' />
            ) : (
              <Edit onClick={handleEditClick} className='opacity-50 hover:opacity-100 transition duration-300 dark:text-gray-100' />
            )}
          </div>

          <div className='relative'>
            <button
              ref={btnRef}
              onClick={() => setOpenOptions((o) => !o)}
              className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500 rounded-full transition-colors duration-200">
              <MoreVertical className="h-6 w-6" />
            </button>

            {openOptions && (
              <OptionButtons
                menuRef={menuRef}
                setOpenOptions={setOpenOptions}
                handleDeleteBoard={handleDelete}
                onAddTask={openAddTaskDialog}
              />
            )}
          </div>
        </div>

        <div className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 w-full -mt-0.5"></div>

        <div className="py-4 overflow-y-auto max-h-[calc(100vh-180px)]">
          {tasks.map((task) => (
            console.log(task),
            <TaskCard key={task.id} task={task} onDeleteTask={handleDeleteTask} />
          ))}
        </div>

        <button
          onClick={openAddTaskDialog}
          className="w-full flex items-center justify-center py-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-200 font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 transform hover:scale-[1.01] active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-500"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add task
        </button>
      </div>
    </>
  );
}
