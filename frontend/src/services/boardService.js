import api from "./api.js";

export async function getBoards() {
  const response = await api.get('/boards');
  return response.data
}

export async function createBoard(board) {
  const response = await api.post('/boards', board)
  console.log(board)
  return response.data
}

export async function deleteBoard(boardId) {
  await api.delete(`/boards/${boardId}`)
}