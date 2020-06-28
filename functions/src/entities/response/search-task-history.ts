import { TaskHistory } from '../task-history'

export default class SearchTaskHistoryResponse {
  taskHistories: TaskHistory[]

  constructor (init: Partial<SearchTaskHistoryResponse>) {
    this.taskHistories = init.taskHistories ?? []
  }
}
