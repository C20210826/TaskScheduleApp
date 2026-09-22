<script setup>
import { reactive, ref, watch } from 'vue'
import { TASK_PRIORITY, TASK_PRIORITY_META } from '../constants.js'

const props = defineProps({
  // 编辑模式时传入待编辑任务，新建模式为 null
  initialTask: { type: Object, default: null },
  submitText: { type: String, default: '添加任务' },
})

const emit = defineEmits(['submit', 'cancel'])

const form = reactive({ title: '', description: '', priority: TASK_PRIORITY.medium })
const error = ref('')

watch(
  () => props.initialTask,
  (task) => {
    form.title = task?.title ?? ''
    form.description = task?.description ?? ''
    form.priority = task?.priority ?? TASK_PRIORITY.medium
    error.value = ''
  },
  { immediate: true },
)

function handleSubmit() {
  const title = form.title.trim()
  if (!title) {
    error.value = '标题为必填项，请输入任务标题'
    return
  }
  emit('submit', {
    title,
    description: form.description.trim(),
    priority: form.priority,
  })
  form.title = ''
  form.description = ''
  form.priority = TASK_PRIORITY.medium
  error.value = ''
}

function handleCancel() {
  emit('cancel')
}
</script>

<template>
  <form class="space-y-3" @submit.prevent="handleSubmit">
    <div>
      <input
        v-model="form.title"
        type="text"
        placeholder="任务标题（必填）"
        class="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-blue-500 dark:focus:ring-blue-900/40"
        :class="{ 'border-red-400': error }"
      />
      <p v-if="error" class="mt-1 text-xs text-red-500">{{ error }}</p>
    </div>
    <textarea
      v-model="form.description"
      rows="2"
      placeholder="任务描述（选填）"
      class="w-full resize-none rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-blue-500 dark:focus:ring-blue-900/40"
    ></textarea>
    <div>
      <span class="mb-1.5 block text-xs font-medium text-slate-500 dark:text-slate-400">优先级</span>
      <div class="grid grid-cols-3 gap-2">
        <button
          v-for="priority in TASK_PRIORITY_META"
          :key="priority.value"
          type="button"
          class="rounded-xl border px-3 py-2 text-sm font-medium transition"
          :class="form.priority === priority.value ? priority.activeClass : [priority.inactiveClass, priority.darkInactiveClass]"
          @click="form.priority = priority.value"
        >
          {{ priority.label }}
        </button>
      </div>
    </div>
    <div class="flex justify-end gap-2">
      <button
        type="button"
        class="rounded-xl px-4 py-2 text-sm font-medium text-slate-500 transition hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700"
        @click="handleCancel"
      >
        取消
      </button>
      <button
        type="submit"
        class="rounded-xl bg-blue-600 px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
      >
        {{ submitText }}
      </button>
    </div>
  </form>
</template>
