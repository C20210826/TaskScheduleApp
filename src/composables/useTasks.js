import { ref, watch } from 'vue'
import { TASK_STATUS, TASK_PRIORITY } from '../constants.js'

const STORAGE_KEY = 'task-manager.tasks'

function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch (error) {
    console.warn('读取本地任务数据失败：', error)
    return []
  }
}

function saveTasks(tasks) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  } catch (error) {
    console.warn('保存任务数据失败：', error)
  }
}

function createId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
}

export function useTasks() {
  const tasks = ref(loadTasks())

  function addTask({ title, description = '', priority = TASK_PRIORITY.medium }) {
    const now = new Date().toISOString()
    const task = {
      id: createId(),
      title: title.trim(),
      description: description.trim(),
      priority,
      status: TASK_STATUS.todo,
      createdAt: now,
      updatedAt: now,
    }
    tasks.value = [task, ...tasks.value]
    return task
  }

  function updateTask(id, patch) {
    tasks.value = tasks.value.map((task) =>
      task.id === id ? { ...task, ...patch, updatedAt: new Date().toISOString() } : task,
    )
  }

  function removeTask(id) {
    tasks.value = tasks.value.filter((task) => task.id !== id)
  }

  // 任务数据变化时自动写入 localStorage
  watch(tasks, saveTasks, { deep: true })

  return { tasks, addTask, updateTask, removeTask }
}
