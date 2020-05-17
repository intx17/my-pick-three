import { TaskCategory } from '~/src/enums/task-category'
import IUser from '~/src/entities/user'

export default interface ITask {
  taskId?: string
  taskName: string,
  taskDetail: string,
  categoryId: TaskCategory
  user: IUser
}
