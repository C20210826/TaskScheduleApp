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
