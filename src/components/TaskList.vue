<script setup>
import TaskItem from './TaskItem.vue'

defineProps({
  tasks: { type: Array, required: true },
  editingTaskId: { type: String, default: null },
})

defineEmits(['edit', 'remove', 'save', 'cancel-edit', 'change-status'])
</script>

<template>
  <ul v-if="tasks.length" class="space-y-3">
    <TaskItem
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      :editing="editingTaskId === task.id"
      @edit="(id) => $emit('edit', id)"
      @remove="(id) => $emit('remove', id)"
      @save="(payload) => $emit('save', payload)"
      @cancel-edit="$emit('cancel-edit')"
      @change-status="(payload) => $emit('change-status', payload)"
    />
  </ul>
  <div
    v-else
    class="mt-4 rounded-2xl border border-dashed border-slate-300 bg-white/60 py-12 text-center"
  >
    <p class="text-sm text-slate-400">当前筛选下暂无任务</p>
  </div>
</template>
