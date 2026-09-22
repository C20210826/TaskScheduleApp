<script setup>
import { computed, ref } from 'vue'
import { useTasks } from './composables/useTasks.js'
import { TASK_STATUS, TASK_STATUS_META } from './constants.js'
import TaskForm from './components/TaskForm.vue'
import TaskList from './components/TaskList.vue'

const { tasks, addTask, updateTask, removeTask } = useTasks()

const showForm = ref(false)
const editingTaskId = ref(null)

const filters = [{ value: 'all', label: '全部' }, ...TASK_STATUS_META]
const activeFilter = ref('all')

const filteredTasks = computed(() => {
  if (activeFilter.value === 'all') return tasks.value
  return tasks.value.filter((task) => task.status === activeFilter.value)
})

const countByStatus = computed(() => {
  const counts = {
    [TASK_STATUS.todo]: 0,
    [TASK_STATUS.doing]: 0,
    [TASK_STATUS.done]: 0,
  }
  for (const task of tasks.value) counts[task.status] += 1
  return counts
})

function handleAdd({ title, description }) {
  addTask({ title, description })
  showForm.value = false
}

function handleSave({ id, title, description }) {
  updateTask(id, { title, description })
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
  <div class="min-h-screen bg-slate-100 py-10">
    <div class="mx-auto max-w-2xl px-4">
      <header class="mb-8 text-center">
        <h1 class="text-3xl font-bold text-slate-800">任务管理</h1>
        <p class="mt-2 text-sm text-slate-500">共 {{ tasks.length }} 个任务 · 数据保存在浏览器本地</p>
      </header>

      <section class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <button
          v-if="!showForm"
          type="button"
          class="w-full rounded-xl border-2 border-dashed border-slate-300 px-4 py-3 text-sm font-medium text-slate-500 transition hover:border-blue-400 hover:text-blue-500"
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

      <nav class="mt-6 flex flex-wrap gap-2">
        <button
          v-for="filter in filters"
          :key="filter.value"
          type="button"
          class="rounded-full px-4 py-1.5 text-sm font-medium transition"
          :class="
            activeFilter === filter.value
              ? 'bg-slate-800 text-white shadow'
              : 'bg-white text-slate-600 hover:bg-slate-200'
          "
          @click="activeFilter = filter.value"
        >
          {{ filter.label }}
          <span v-if="filter.value !== 'all'" class="ml-1 opacity-70">
            {{ countByStatus[filter.value] }}
          </span>
        </button>
      </nav>

      <TaskList
        :tasks="filteredTasks"
        :editing-task-id="editingTaskId"
        class="mt-4"
        @edit="handleEdit"
        @remove="handleRemove"
        @save="handleSave"
        @cancel-edit="handleCancelEdit"
        @change-status="handleChangeStatus"
      />
    </div>
  </div>
</template>
