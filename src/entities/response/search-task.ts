import { Task } from '../task'

export default class SearchTaskResponse {
  tasks: Task[]

  constructor (init: Partial<SearchTaskResponse>) {
    this.tasks = init.tasks ?? []
  }
}
