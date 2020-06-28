export interface ICategory {
  categoryId?: string,
  categoryCode: number,
  categoryName: string
}

const defaultValues = (): ICategory => ({
  categoryId: '',
  categoryCode: NaN,
  categoryName: ''
})

export class Category implements ICategory {
  categoryId: string
  categoryCode: number
  categoryName: string

  constructor (init: Partial<Category> = defaultValues()) {
    const dv = defaultValues()
    this.categoryId = (init.categoryId || (dv.categoryId || ''))
    this.categoryCode = (init.categoryCode || dv.categoryCode)
    this.categoryName = (init.categoryName || dv.categoryName)
  }
}
