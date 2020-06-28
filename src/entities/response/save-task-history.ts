export default class SaveTaskHistoryResponse {
  historyId?: string

  constructor (init: Partial<SaveTaskHistoryResponse>) {
    this.historyId = init.historyId
  }
}
