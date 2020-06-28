const defaultValues = (): SaveTaskHistoryRequest => ({
  email: '',
  taskId: '',
  taskName: '',
  taskDetail: '',
  categoryName: '',
  dateStr: '',
  done: false
})

export default class SaveTaskHistoryRequest {
  email: string
  taskId: string
  taskName: string
  taskDetail: string
  categoryName: string
  dateStr: string
  done: boolean

  constructor (init: Partial<SaveTaskHistoryRequest> = defaultValues()) {
    const dv = defaultValues()
    this.email = (init.email || (dv.email))
    this.taskId = (init.taskId || (dv.taskId))
    this.taskName = (init.taskName || dv.taskName)
    this.taskDetail = (init.taskDetail || dv.taskDetail)
    this.categoryName = (init.categoryName || dv.categoryName)
    this.dateStr = (init.dateStr || dv.dateStr)
    this.done = (init.done || dv.done)
  }
}
