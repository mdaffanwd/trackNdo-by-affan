import api from "./api.js";

export async function createTaskApi(task) {
  const response = await api.post('/tasks', task)
  return response.data
}

export async function updateTaskApi(taskId, updateTask) {
  const response = await api.patch(`/tasks/${taskId}`, updateTask)
  return response.data
}

export async function deleteTaskApi(taskId) {
  const response = await api.delete(`/tasks/${taskId}`)
  console.log(taskId)
  return response.data
}