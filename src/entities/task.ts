import IUser from '~/src/entities/user'

export default interface ITask {
  taskId?: string
  taskName: string,
  taskDetail: string,
  categoryId: number,
  user: IUser
}
