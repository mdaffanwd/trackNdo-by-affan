import { Edit, MoreVertical, Plus, PlusCircle, Save } from 'lucide-react';
import { useEffect, useRef, useState } from 'react'
import TaskCard from './TaskCard.jsx';
import OptionButtons from './OptionButtons.jsx';
import AddTaskDialog from '../dialogs/AddTaskDialog.jsx';


export default function Board({
  title,
  handleDeleteBoard,
  boardId,
  handleRenameBoard
}) {

  const btnRef = useRef()
  const menuRef = useRef()
  const inputRef = useRef();


  const [openOptions, setOpenOptions] = useState(false)

  // add task dialog.
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [editBoardTitle, setEditBoardTitle] = useState("");

  const [tasks, setTasks] = useState([
    {
      id: 'task-1',
      priority: 'Low Priority',
      title: "make website",
      description: 'Company website redesign.',
      comments: 1,
      attachments: 2,
      assignee: 'user1', // Corresponds to assigneeImages keys
    },
    {
      id: 'task-2',
      priority: 'Med Priority',
      description: 'Mobile app login process prototype.',
      comments: 2,
      attachments: 3,
      assignee: 'user2',
    },
    {
      id: 'task-3',
      priority: 'High Priority',
      description: 'Onboarding designs.',
      comments: 1,
      attachments: 1,
      assignee: 'user3',
    },
  ]);

  function handleAddTask() {
    console.log("Add new task clicked!");
    setOpenOptions(false);  // Close dropdown
    setIsAddTaskOpen(true); // Open modal
  }

  function handleDelete() {
    handleDeleteBoard(boardId)
  }

  function handleEditClick() {
    setIsEditing(true);
    setEditBoardTitle(title);
  }

  function handleSaveChangedTitle() {
    const trimmed = editBoardTitle.trim();
    if (trimmed && trimmed !== title) {
      handleRenameBoard(boardId, trimmed)
    }
    setIsEditing(false);
    setEditBoardTitle(trimmed || title);
  }


  useEffect(() => {
    function onDocClick(e) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        btnRef.current &&
        !btnRef.current.contains(e.target)
      ) {
        setOpenOptions(false)
      }
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [])

  // for editing board title
  useEffect(() => {
    if (isEditing) inputRef.current?.focus();
  }, [isEditing]);

  return (
    <>
      {/* Show AddTaskDialog if open */}
      {isAddTaskOpen && (
        <AddTaskDialog setIsAddTaskOpen={setIsAddTaskOpen} />
      )

      }
      <div className="flex-grow p-4 bg-gray-50 dark:bg-gray-800 border-t-4 border-t-red-800 rounded-2xl shadow-xl transition-colors duration-300 dark:shadow-2xl dark:shadow-gray-800">
        {/* Board Header */}
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
            ) : (<h2 className="w-fit text-2xl font-bold text-gray-800 dark:text-gray-100">{title}</h2>)
            }

            {isEditing ? (<Save onClick={handleSaveChangedTitle} className=' opacity-50 hover:opacity-100 transition duration-300 dark:text-gray-100' />) :
              <Edit onClick={handleEditClick} className='opacity-50 hover:opacity-100 transition duration-300 dark:text-gray-100' />
            }
          </div>

          <div className='relative'>
            <button
              ref={btnRef}
              onClick={() => setOpenOptions((o) => !o)}
              className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500 rounded-full transition-colors duration-200">
              <MoreVertical className="h-6 w-6" />
            </button>

            {/* for options  */}
            {openOptions && (
              <OptionButtons menuRef={menuRef} setOpenOptions={setOpenOptions} onAddTask={handleAddTask} handleDeleteBoard={handleDelete} />
            )}

          </div>
        </div>
        
        {/* Top border gradient (cosmetic from screenshot) */}
        <div className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 w-full -mt-0.5"></div>


        {/* Task Cards Container */}
        <div className="py-4 overflow-y-auto max-h-[calc(100vh-180px)]">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>

        <button
          onClick={handleAddTask}
          className="w-full flex items-center justify-center py-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-200 font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 transform hover:scale-[1.01] active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-500"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add task
        </button>
      </div >

    </>
  );
}