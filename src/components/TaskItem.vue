<script setup>
import { TASK_STATUS, TASK_STATUS_META } from '../constants.js'
import TaskForm from './TaskForm.vue'

const props = defineProps({
  task: { type: Object, required: true },
  editing: { type: Boolean, default: false },
})

const emit = defineEmits(['edit', 'remove', 'save', 'cancel-edit', 'change-status'])
</script>

<template>
  <li class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
    <TaskForm
      v-if="editing"
      :initial-task="task"
      submit-text="保存修改"
      @submit="(data) => emit('save', { id: task.id, ...data })"
      @cancel="emit('cancel-edit')"
    />

    <div v-else>
      <div class="flex items-start justify-between gap-4">
        <h3
          class="text-base font-semibold text-slate-800"
          :class="{ 'text-slate-400 line-through': task.status === TASK_STATUS.done }"
        >
          {{ task.title }}
        </h3>
        <div class="flex shrink-0 gap-2">
          <button
            type="button"
            class="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
            @click="emit('edit', task.id)"
          >
            编辑
          </button>
          <button
            type="button"
            class="rounded-lg px-3 py-1.5 text-xs font-medium text-red-500 transition hover:bg-red-50"
            @click="emit('remove', task.id)"
          >
            删除
          </button>
        </div>
      </div>

      <p v-if="task.description" class="mt-1 text-sm leading-relaxed text-slate-500">
        {{ task.description }}
      </p>

      <div class="mt-4 flex items-center justify-between">
        <div class="flex gap-1 rounded-full bg-slate-100 p-1">
          <button
            v-for="status in TASK_STATUS_META"
            :key="status.value"
            type="button"
            class="rounded-full px-3 py-1 text-xs font-medium transition"
            :class="
              task.status === status.value
                ? 'bg-white text-slate-800 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            "
            @click="emit('change-status', { id: task.id, status: status.value })"
          >
            {{ status.label }}
          </button>
        </div>
        <span class="text-xs text-slate-400">
          创建于 {{ new Date(task.createdAt).toLocaleDateString() }}
        </span>
      </div>
    </div>
  </li>
</template>
