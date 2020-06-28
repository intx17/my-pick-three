export interface ITaskHistory {
  historyId?: string,
  taskId: string
  taskName: string,
  taskDetail: string,
  categoryName: string,
  date: Date,
  done: boolean
}

const defaultValues = (): ITaskHistory => ({
  taskId: '',
  historyId: undefined,
  taskName: '',
  taskDetail: '',
  categoryName: '',
  date: new Date(),
  done: false
})

export class TaskHistory implements ITaskHistory {
  historyId: string
  taskId: string
  taskName: string
  taskDetail: string
  categoryName: string
  date: Date
  done: boolean

  constructor (init: Partial<TaskHistory> = defaultValues()) {
    const dv = defaultValues()
    this.historyId = (init.historyId || (dv.historyId || ''))
    this.taskId = (init.taskId || (dv.taskId))
    this.taskName = (init.taskName || dv.taskName)
    this.taskDetail = (init.taskDetail || dv.taskDetail)
    this.categoryName = (init.categoryName || dv.categoryName)
    this.date = (init.date || dv.date)
    this.done = (init.done || dv.done)
  }
}
