const defaultValues = () => ({
  email: '',
  taskName: '',
  taskDetail: '',
  categoryId: ''
})

export default class SaveTaskRequest {
  email: string
  taskName: string
  taskDetail: string
  categoryId: string

  constructor (init: Partial<SaveTaskRequest> = defaultValues()) {
    const dv = defaultValues()
    this.email = (init.email || dv.email)
    this.taskName = (init.taskName || dv.taskName)
    this.taskDetail = (init.taskDetail || dv.taskDetail)
    this.categoryId = (init.categoryId || dv.categoryId)
  }
}
