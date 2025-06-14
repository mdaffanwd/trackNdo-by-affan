import { useCallback, useState } from 'react'
import AddBoardDialog from '../dialogs/AddBoardDialog.jsx'
import Board from '../ui/Board.jsx'
import { Plus } from 'lucide-react'
import { useEffect } from 'react'
import { createBoard, deleteBoard, getBoards, updateBoard } from '../../services/boardService.js'
import toast from 'react-hot-toast';

export default function BoardsContainer() {
    const [boards, setBoards] = useState([])
    const [isAddBoardOpen, setIsAddBoardOpen] = useState(false)
    const [boardTitle, setBoardTitle] = useState('')

    function handleOpenBoard() {
        setIsAddBoardOpen(true)
    }
    function handleCloseBoard() {
        setIsAddBoardOpen(false)
    }

    const handleCreateBoard = useCallback(async (e) => {
        if (!boardTitle.trim()) return;
        try {
            const newBoard = await createBoard({ title: boardTitle })
            // console.log(newBoard)
            setBoards((prev) => [...prev, newBoard]);
            handleCloseBoard();
            setBoardTitle("")
            toast.success(`Board added successfully with title: ${boardTitle}`);
        } catch (error) {
            console.error('Create board failed', error);
            toast.error("Something went wrong!");
        }
    }, [boardTitle, setBoards, setBoardTitle, handleCloseBoard])

    async function handleDeleteBoard(boardId) {
        try {
            await deleteBoard(boardId)
            setBoards((prev) => prev.filter((board) => board._id !== boardId));
            toast.success(`Board deleted successfully`);
        } catch (error) {
            toast.error("Something went wrong!");
        }
    }

    async function handleRenameBoard(boardId, newTitle) {
        console.log(newTitle)
        try {
            const updated = await updateBoard(boardId, { title: newTitle });
            setBoards(allBoards =>
                allBoards.map(board => (board._id === boardId ? { ...board, title: updated.title } : board))
            );
            toast.success(`Renamed board to “${updated.title}”`);
        } catch (error) {
            console.error(error);
            toast.error('Could not rename board');
        }
    }

    useEffect(() => {
        async function getAllBoards() {
            try {
                const allBoards = await getBoards()
                setBoards(allBoards)
            } catch (error) {
                console.log('failed to fetch boards', error)
            }
        }
        getAllBoards()
    }, [])

    return (
        <main className='p-4 bg-slate-100 dark:bg-gray-900'>
            <div className='w-full'>
                {/* <Header /> */}

                <AddBoardDialog
                    boardTitle={boardTitle}
                    setBoardTitle={setBoardTitle}
                    isAddBoardOpen={isAddBoardOpen}
                    setIsAddBoardOpen={setIsAddBoardOpen}
                    handleCreateBoard={handleCreateBoard}
                />

                <button
                    onClick={handleOpenBoard}
                    className="z-30 sticky top-20 flex items-center justify-center gap-2 px-4 py-2 mb-4 bg-blue-100 text-blue-800 font-medium rounded-lg hover:bg-blue-200 transition">
                    <Plus className="h-5 w-5" />
                    <span>Add New Board</span>
                </button>

                <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  items-center gap-4 mx-auto'>
                    {boards
                        .slice().reverse()
                        .map(board => (
                            <Board
                                key={board._id}
                                boardId={board._id}
                                title={board.title}
                                initialTasks={board.tasks || []}
                                handleDeleteBoard={handleDeleteBoard}
                                handleRenameBoard={handleRenameBoard}
                            />
                        ))}
                </div>
            </div>
        </main>
    )
}
