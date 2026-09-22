<script setup>
import { ref } from 'vue'
import { TASK_STATUS_META } from '../constants.js'
import TaskItem from './TaskItem.vue'

defineProps({
  tasksByStatus: { type: Object, required: true },
  editingTaskId: { type: String, default: null },
})

const emit = defineEmits(['edit', 'remove', 'save', 'cancel-edit', 'change-status'])

const draggingTaskId = ref(null)
const dragOverStatus = ref(null)

function handleDragStart(id) {
  draggingTaskId.value = id
}

function handleDragOver(status) {
  dragOverStatus.value = status
}

function handleDrop(status) {
  const id = draggingTaskId.value
  draggingTaskId.value = null
  dragOverStatus.value = null
  if (id) {
    emit('change-status', { id, status })
  }
}

function handleDragEnd() {
  draggingTaskId.value = null
  dragOverStatus.value = null
}
</script>

<template>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
    <section
      v-for="status in TASK_STATUS_META"
      :key="status.value"
      class="flex flex-col rounded-2xl border border-slate-200 bg-slate-50 p-3 transition"
      :class="dragOverStatus === status.value ? 'border-blue-400 bg-blue-50 ring-2 ring-blue-100' : ''"
    >
      <header class="mb-3 flex items-center justify-between px-1">
        <h2 class="text-sm font-semibold text-slate-700">{{ status.label }}</h2>
        <span class="rounded-full bg-white px-2 py-0.5 text-xs font-medium text-slate-500">
          {{ tasksByStatus[status.value].length }}
        </span>
      </header>

      <div
        class="flex min-h-24 flex-1 flex-col space-y-3"
        @dragover.prevent="handleDragOver(status.value)"
        @drop.prevent="handleDrop(status.value)"
      >
        <TaskItem
          v-for="task in tasksByStatus[status.value]"
          :key="task.id"
          :task="task"
          :editing="editingTaskId === task.id"
          @edit="(id) => emit('edit', id)"
          @remove="(id) => emit('remove', id)"
          @save="(payload) => emit('save', payload)"
          @cancel-edit="emit('cancel-edit')"
          @drag-start="handleDragStart"
          @drag-end="handleDragEnd"
        />

        <div
          v-if="!tasksByStatus[status.value].length"
          class="flex flex-1 items-center justify-center rounded-xl border border-dashed border-slate-300 py-8 text-xs text-slate-400"
        >
          拖拽任务到此列
        </div>
      </div>
    </section>
  </div>
</template>
