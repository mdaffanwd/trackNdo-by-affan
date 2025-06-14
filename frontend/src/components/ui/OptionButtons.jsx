

function OptionButtons({ menuRef, setOpenOptions, onAddTask, handleDeleteBoard }) {

  function handleDelete() {
      setOpenOptions(false);
      console.log('clicked')
      handleDeleteBoard()
  }

  return (
    <div
      ref={menuRef}
      className="absolute mt-2 right-0 w-40 bg-white border border-gray-200 rounded-xl shadow-2xl z-20 overflow-hidden"
    >
      <button
        onClick={onAddTask}
        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 border-b border-gray-100"
      >
        Add Task
      </button>
      <button
        // onClick={() => {
        //   console.log('Delete clicked!');
        // }}
        onClick={handleDelete}
        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
      >
        Delete
      </button>
    </div>
  );
}

export default OptionButtons;
