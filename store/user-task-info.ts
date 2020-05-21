import { Mutation, Action, VuexModule, Module } from 'vuex-module-decorators'
import { Task } from '~/src/entities/task'
import { TaskHistory } from '~/src/entities/task-history'
import { Category } from '~/src/entities/category'

// state's interface
export interface IUserTaskInfoStore {
  tasks: Task[]
  taskHistories: TaskHistory[],
  categories: Category[]
}

@Module({
  name: 'user-task-info',
  namespaced: true,
  stateFactory: true
})
export default class UserTaskInfoStore extends VuexModule implements IUserTaskInfoStore {
  // state
  tasks: Task[] = []
  taskHistories: TaskHistory[] = []
  categories: Category[] = []

  // mutation
  @Mutation
  public setTasks (tasks: Task[]) {
    this.tasks = tasks
  }

  @Mutation
  public setTaskHistories (taskHistories: TaskHistory[]) {
    this.taskHistories = taskHistories
  }

   @Mutation
  public setCategories (categories: Category[]) {
    this.categories = categories
  }

  // actions
  @Action
   public updateTasks (tasks: Task[]) {
     this.setTasks(tasks)
   }

  @Action
  public updateTaskHistories (taskHistories: TaskHistory[]) {
    this.setTaskHistories(taskHistories)
  }

  @Action
  public updateCategories (categories: Category[]) {
    this.setCategories(categories)
  }
}
