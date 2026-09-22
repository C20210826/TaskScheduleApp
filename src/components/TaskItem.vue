<script setup>
import { computed } from 'vue'
import { TASK_STATUS, TASK_PRIORITY_META } from '../constants.js'
import TaskForm from './TaskForm.vue'

const props = defineProps({
  task: { type: Object, required: true },
  editing: { type: Boolean, default: false },
})

const emit = defineEmits(['edit', 'remove', 'save', 'cancel-edit', 'drag-start', 'drag-end'])

const priorityMeta = computed(
  () => TASK_PRIORITY_META.find((p) => p.value === props.task.priority) ?? TASK_PRIORITY_META[1],
)
</script>

<template>
  <li
    :draggable="!editing"
    class="cursor-grab rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md active:cursor-grabbing dark:border-slate-700 dark:bg-slate-800"
    @dragstart="emit('drag-start', task.id)"
    @dragend="emit('drag-end')"
  >
    <TaskForm
      v-if="editing"
      :initial-task="task"
      submit-text="保存修改"
      @submit="(data) => emit('save', { id: task.id, ...data })"
      @cancel="emit('cancel-edit')"
    />

    <div v-else>
      <div class="flex items-start justify-between gap-4">
        <div class="flex min-w-0 flex-1 items-start gap-2">
          <span
            class="mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold"
            :class="[priorityMeta.badgeClass, priorityMeta.darkBadgeClass]"
          >
            {{ priorityMeta.label }}
          </span>
          <h3
            class="break-words text-base font-semibold"
            :class="
              task.status === TASK_STATUS.done
                ? 'text-slate-400 line-through dark:text-slate-500'
                : [priorityMeta.titleClass, priorityMeta.darkTitleClass]
            "
          >
            {{ task.title }}
          </h3>
        </div>
        <div class="flex shrink-0 gap-2">
          <button
            type="button"
            class="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-200"
            @click="emit('edit', task.id)"
          >
            编辑
          </button>
          <button
            type="button"
            class="rounded-lg px-3 py-1.5 text-xs font-medium text-red-500 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/40"
            @click="emit('remove', task.id)"
          >
            删除
          </button>
        </div>
      </div>

      <p v-if="task.description" class="mt-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
        {{ task.description }}
      </p>

      <div class="mt-4 flex items-center justify-between">
        <span class="text-xs text-slate-400 dark:text-slate-500">拖拽到其他列可改状态</span>
        <span class="text-xs text-slate-400 dark:text-slate-500">
          创建于 {{ new Date(task.createdAt).toLocaleDateString() }}
        </span>
      </div>
    </div>
  </li>
</template>
