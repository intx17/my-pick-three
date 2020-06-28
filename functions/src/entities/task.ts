export interface ITask {
  taskId?: string
  taskName: string
  taskDetail: string
  categoryId: string
}

const defaultValues = (): ITask => ({
  taskId: '',
  taskName: '',
  taskDetail: '',
  categoryId: ''
})

export class Task implements ITask {
  taskId: string
  taskName: string
  taskDetail: string
  categoryId: string

  constructor (init: Partial<Task> = defaultValues()) {
    const dv = defaultValues()
    this.taskId = (init.taskId || (dv.taskId || ''))
    this.taskName = (init.taskName || dv.taskName)
    this.taskDetail = (init.taskDetail || dv.taskDetail)
    this.categoryId = (init.categoryId || dv.categoryId)
  }
}
