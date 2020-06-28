export default class SaveTaskResponse {
  taskId?: string

  constructor (init: Partial<SaveTaskResponse>) {
    this.taskId = init.taskId
  }
}
