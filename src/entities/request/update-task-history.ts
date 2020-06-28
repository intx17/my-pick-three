const defaultValues = (): UpdateTaskHistoryRequest => ({
  email: '',
  historyId: '',
  done: false
})

export default class UpdateTaskHistoryRequest {
  email: string
  historyId: string
  done: boolean

  constructor (init: Partial<UpdateTaskHistoryRequest> = defaultValues()) {
    const dv = defaultValues()
    this.email = (init.email || (dv.email))
    this.historyId = (init.historyId || (dv.historyId))
    this.done = (init.done || (dv.done))
  }
}
