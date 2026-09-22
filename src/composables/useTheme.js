import { ref, watch } from 'vue'

const STORAGE_KEY = 'theme'

// 以当前 <html> 是否带 dark 类作为初始状态（由 index.html 内联脚本预先设置，避免闪烁）
const isDark = ref(document.documentElement.classList.contains('dark'))

function applyTheme(dark) {
  document.documentElement.classList.toggle('dark', dark)
  try {
    localStorage.setItem(STORAGE_KEY, dark ? 'dark' : 'light')
  } catch (e) {
    // localStorage 不可用（隐私模式等）时静默失败
  }
}

watch(isDark, applyTheme, { immediate: true })

export function useTheme() {
  function toggleTheme() {
    isDark.value = !isDark.value
  }

  return { isDark, toggleTheme }
}
