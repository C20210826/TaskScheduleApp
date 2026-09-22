<script setup>
import { computed, ref } from 'vue'
import { useTasks } from './composables/useTasks.js'
import { useTheme } from './composables/useTheme.js'
import { TASK_STATUS } from './constants.js'
import TaskForm from './components/TaskForm.vue'
import KanbanBoard from './components/KanbanBoard.vue'

const { tasks, addTask, updateTask, removeTask } = useTasks()
const { isDark, toggleTheme } = useTheme()

const showForm = ref(false)
const editingTaskId = ref(null)

const columns = computed(() => {
  const groups = {
    [TASK_STATUS.todo]: [],
    [TASK_STATUS.doing]: [],
    [TASK_STATUS.done]: [],
  }
  for (const task of tasks.value) {
    if (groups[task.status]) groups[task.status].push(task)
  }
  return groups
})

function handleAdd({ title, description, priority }) {
  addTask({ title, description, priority })
  showForm.value = false
}

function handleSave({ id, title, description, priority }) {
  updateTask(id, { title, description, priority })
  editingTaskId.value = null
}

function handleChangeStatus({ id, status }) {
  updateTask(id, { status })
}

function handleEdit(id) {
  editingTaskId.value = id
}

function handleCancelEdit() {
  editingTaskId.value = null
}

function handleRemove(id) {
  removeTask(id)
  if (editingTaskId.value === id) editingTaskId.value = null
}
</script>

<template>
  <div class="relative min-h-screen bg-slate-100 py-10 transition-colors dark:bg-slate-950">
    <button
      type="button"
      class="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
      @click="toggleTheme"
    >
      <span>{{ isDark ? '☀️' : '🌙' }}</span>
      <span>{{ isDark ? '浅色模式' : '深色模式' }}</span>
    </button>
    <div class="mx-auto max-w-6xl px-4">
      <header class="mb-8 pt-10 text-center">
        <h1 class="text-3xl font-bold text-slate-800 dark:text-slate-100">任务管理</h1>
        <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">共 {{ tasks.length }} 个任务 · 数据保存在浏览器本地</p>
      </header>

      <section class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <button
          v-if="!showForm"
          type="button"
          class="w-full rounded-xl border-2 border-dashed border-slate-300 px-4 py-3 text-sm font-medium text-slate-500 transition hover:border-blue-400 hover:text-blue-500 dark:border-slate-600 dark:text-slate-400"
          @click="showForm = true"
        >
          ＋ 新建任务
        </button>
        <TaskForm
          v-else
          submit-text="添加任务"
          @submit="handleAdd"
          @cancel="showForm = false"
        />
      </section>

      <KanbanBoard
        :tasks-by-status="columns"
        :editing-task-id="editingTaskId"
        class="mt-6"
        @edit="handleEdit"
        @remove="handleRemove"
        @save="handleSave"
        @cancel-edit="handleCancelEdit"
        @change-status="handleChangeStatus"
      />
    </div>
  </div>
</template>
