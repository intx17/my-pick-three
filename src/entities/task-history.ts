import IUser from '~/src/entities/user'

export default interface ITaskHistory {
  user: IUser,
  taskId: string,
  historyId?: string,
  date: Date,
  done: boolean
}
