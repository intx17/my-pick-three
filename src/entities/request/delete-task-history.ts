const defaultValues = (): DeleteTaskHistoryRequest => ({
  email: '',
  historyId: ''
})

export default class DeleteTaskHistoryRequest {
  email: string
  historyId: string

  constructor (init: Partial<DeleteTaskHistoryRequest> = defaultValues()) {
    const dv = defaultValues()
    this.email = (init.email || (dv.email))
    this.historyId = (init.historyId || (dv.historyId))
  }
}
