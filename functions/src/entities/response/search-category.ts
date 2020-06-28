import { Category } from '../Category'

export default class SearchCategoryResponse {
  categories: Category[]

  constructor (init: Partial<SearchCategoryResponse>) {
    this.categories = init.categories ?? []
  }
}
