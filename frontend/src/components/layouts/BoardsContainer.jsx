import { useCallback, useState } from 'react'
import AddBoardDialog from '../dialogs/AddBoardDialog.jsx'
import Board from '../ui/Board.jsx'
import { Plus } from 'lucide-react'
import Header from './Header.jsx'
import { useEffect } from 'react'
import { createBoard, deleteBoard, getBoards } from '../../services/boardService.js'

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
            console.log(newBoard)
            setBoards((prev) => [...prev, newBoard]);
            handleCloseBoard();
            setBoardTitle("")
        } catch (error) {
            console.error('Create board failed', error);
        }
    }, [boardTitle, setBoards, setBoardTitle, handleCloseBoard])

    async function handleDeleteBoard(boardId) {
        // console.log(boardId)
        await deleteBoard(boardId)
        setBoards((prev) => prev.filter((board) => board._id !== boardId));

    }


    useEffect(() => {
        async function getAllBoards() {
            try {
                const allBoards = await getBoards()
                setBoards(allBoards)
                console.log(allBoards)
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
                    className="z-50 sticky top-20 flex items-center justify-center gap-2 px-4 py-2 mb-4 bg-blue-100 text-blue-800 font-medium rounded-lg hover:bg-blue-200 transition">
                    <Plus className="h-5 w-5" />
                    <span>Add New Board</span>
                </button>

                <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  items-center gap-4 mx-auto'>
                    {boards.map(board => (
                        <Board
                            key={board._id}
                            title={board.title}
                            boardId={board._id}
                            handleDeleteBoard={handleDeleteBoard}
                        />
                    )).reverse()}
                </div>
            </div>
        </main>
    )
}
