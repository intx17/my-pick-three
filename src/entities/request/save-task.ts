import { ITask } from '~/src/entities/task'

const defaultValues = (): ITask => ({
  taskName: '',
  taskDetail: '',
  categoryId: ''
})

export default class SaveTaskRequest implements ITask {
  taskName: string
  taskDetail: string
  categoryId: string

  constructor (init: Partial<SaveTaskRequest> = defaultValues()) {
    const dv = defaultValues()
    this.taskName = (init.taskName || dv.taskName)
    this.taskDetail = (init.taskDetail || dv.taskDetail)
    this.categoryId = (init.categoryId || dv.categoryId)
  }
}
