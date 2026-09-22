// 任务状态定义
export const TASK_STATUS = {
  todo: 'todo',
  doing: 'doing',
  done: 'done',
}

export const TASK_STATUS_META = [
  { value: TASK_STATUS.todo, label: '待办' },
  { value: TASK_STATUS.doing, label: '进行中' },
  { value: TASK_STATUS.done, label: '已完成' },
]

// 任务优先级定义
export const TASK_PRIORITY = {
  high: 'high',
  medium: 'medium',
  low: 'low',
}

export const TASK_PRIORITY_META = [
  {
    value: TASK_PRIORITY.high,
    label: '高',
    badgeClass: 'bg-red-100 text-red-700',
    darkBadgeClass: 'dark:bg-red-900/40 dark:text-red-300',
    titleClass: 'text-red-700',
    darkTitleClass: 'dark:text-red-400',
    dotClass: 'bg-red-500',
    activeClass: 'border-red-500 bg-red-500 text-white',
    inactiveClass: 'border-slate-200 text-red-600 hover:border-red-300 hover:bg-red-50',
    darkInactiveClass: 'dark:border-slate-600 dark:text-red-400 dark:hover:border-red-500 dark:hover:bg-red-900/40',
  },
  {
    value: TASK_PRIORITY.medium,
    label: '中',
    badgeClass: 'bg-yellow-100 text-yellow-800',
    darkBadgeClass: 'dark:bg-yellow-900/40 dark:text-yellow-300',
    titleClass: 'text-yellow-800',
    darkTitleClass: 'dark:text-yellow-400',
    dotClass: 'bg-yellow-400',
    activeClass: 'border-yellow-400 bg-yellow-400 text-yellow-950',
    inactiveClass: 'border-slate-200 text-yellow-700 hover:border-yellow-300 hover:bg-yellow-50',
    darkInactiveClass: 'dark:border-slate-600 dark:text-yellow-300 dark:hover:border-yellow-400 dark:hover:bg-yellow-900/40',
  },
  {
    value: TASK_PRIORITY.low,
    label: '低',
    badgeClass: 'bg-green-100 text-green-700',
    darkBadgeClass: 'dark:bg-green-900/40 dark:text-green-300',
    titleClass: 'text-green-700',
    darkTitleClass: 'dark:text-green-400',
    dotClass: 'bg-green-500',
    activeClass: 'border-green-500 bg-green-500 text-white',
    inactiveClass: 'border-slate-200 text-green-600 hover:border-green-300 hover:bg-green-50',
    darkInactiveClass: 'dark:border-slate-600 dark:text-green-400 dark:hover:border-green-500 dark:hover:bg-green-900/40',
  },
]
