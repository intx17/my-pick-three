const defaultValues = () => ({
  email: ''
})

export default class SearchTaskHistoryRequest {
  email: string

  constructor (init: Partial<SearchTaskHistoryRequest> = defaultValues()) {
    const dv = defaultValues()
    this.email = (init.email || dv.email)
  }
}
