const defaultValues = () => ({
  email: ''
})

export default class SearchCategoryRequest {
  email: string

  constructor (init: Partial<SearchCategoryRequest> = defaultValues()) {
    const dv = defaultValues()
    this.email = (init.email || dv.email)
  }
}
