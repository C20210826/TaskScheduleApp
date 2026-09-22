<script setup>
import { reactive, ref, watch } from 'vue'

const props = defineProps({
  // 编辑模式时传入待编辑任务，新建模式为 null
  initialTask: { type: Object, default: null },
  submitText: { type: String, default: '添加任务' },
})

const emit = defineEmits(['submit', 'cancel'])

const form = reactive({ title: '', description: '' })
const error = ref('')

watch(
  () => props.initialTask,
  (task) => {
    form.title = task?.title ?? ''
    form.description = task?.description ?? ''
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
  emit('submit', { title, description: form.description.trim() })
  form.title = ''
  form.description = ''
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
        class="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
        :class="{ 'border-red-400': error }"
      />
      <p v-if="error" class="mt-1 text-xs text-red-500">{{ error }}</p>
    </div>
    <textarea
      v-model="form.description"
      rows="2"
      placeholder="任务描述（选填）"
      class="w-full resize-none rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
    ></textarea>
    <div class="flex justify-end gap-2">
      <button
        type="button"
        class="rounded-xl px-4 py-2 text-sm font-medium text-slate-500 transition hover:bg-slate-100"
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
