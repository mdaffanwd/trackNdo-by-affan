import { useEffect, useRef, useState } from 'react'
import { Plus } from 'lucide-react'

export default function AddBoardDialog({ handleCreateBoard, boardTitle, setBoardTitle, isAddBoardOpen, setIsAddBoardOpen }) {

    const dialogRef = useRef()

    const handleFormSubmit = (e) => {
        e.preventDefault();
        handleCreateBoard(e);
    };

    useEffect(() => {
        function onDocClick(e) {
            if (dialogRef.current && !dialogRef.current.contains(e.target)) {
                setIsAddBoardOpen(false)
            }
        }

        document.addEventListener('mousedown', onDocClick)
        return () => document.removeEventListener('mousedown', onDocClick)
    }, [setIsAddBoardOpen])

    if (!isAddBoardOpen) return null;
    return (
        <>
            {/* Modal Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 flex items-center justify-center " >
                {/* Modal Panel */}
                <form
                    ref={dialogRef}
                    onSubmit={handleFormSubmit}
                    className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm dark:bg-gray-800 dark:text-gray-200" >
                    <h2 className="text-xl font-semibold mb-4">Create New Board</h2>
                    <input
                        type="text"
                        value={boardTitle}
                        onChange={(e) => setBoardTitle(e.target.value)}
                        autoFocus
                        placeholder="Board name"
                        className="w-full px-4 py-2  border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue- dark:focus:ring-blue-500 mb-4 transition-colors duration-300"
                    />
                    <div className="flex justify-end space-x-3">
                        <button
                        type='button'
                            onClick={() => setIsAddBoardOpen(false)}
                            className="px-4 py-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            type='submit'
                            className="px-4 py-2 rounded-md bg-blue-600 dark:bg-blue-500 text-white dark:text-white hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200"
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div >
        </>
    )
}
