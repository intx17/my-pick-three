import { ITaskHistory } from '~/src/entities/task-history'

const defaultValues = (): ITaskHistory => ({
  taskId: '',
  taskName: '',
  taskDetail: '',
  categoryName: '',
  date: new Date(),
  done: false
})

export default class SaveTaskHistoryRequest implements ITaskHistory {
  taskId: string
  taskName: string
  taskDetail: string
  categoryName: string
  date: Date
  done: boolean

  constructor (init: Partial<SaveTaskHistoryRequest> = defaultValues()) {
    const dv = defaultValues()
    this.taskId = (init.taskId || (dv.taskId))
    this.taskName = (init.taskName || dv.taskName)
    this.taskDetail = (init.taskDetail || dv.taskDetail)
    this.categoryName = (init.categoryName || dv.categoryName)
    this.date = (init.date || dv.date)
    this.done = (init.done || dv.done)
  }
}
