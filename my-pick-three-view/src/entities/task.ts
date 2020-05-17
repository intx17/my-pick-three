import { TaskCategory } from '~/src/enums/task-category'
import IUser from '~/src/entities/user'

export default interface ITask {
  taskName: string,
  categoryId: TaskCategory
  user: IUser
}
