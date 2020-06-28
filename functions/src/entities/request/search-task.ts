const defaultValues = () => ({
  email: ''
})

export default class SearchTaskRequest {
  email: string

  constructor (init: Partial<SearchTaskRequest> = defaultValues()) {
    const dv = defaultValues()
    this.email = (init.email || dv.email)
  }
}
