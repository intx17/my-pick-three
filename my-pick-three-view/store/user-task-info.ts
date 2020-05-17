import { Mutation, Action, VuexModule, Module } from 'vuex-module-decorators'
import ITask from '~/src/entities/task'
import ITaskHistory from '~/src/entities/task-history'
import ICategory from '~/src/entities/category'

// state's interface
export interface IUserTaskInfoStore {
  tasks: ITask[]
  taskHistories: ITaskHistory[],
  categories: ICategory[]
}

@Module({
  name: 'user-task-info',
  namespaced: true,
  stateFactory: true
})
export default class UserTaskInfoStore extends VuexModule implements IUserTaskInfoStore {
  // state
  tasks: ITask[] = []
  taskHistories: ITaskHistory[] = []
  categories: ICategory[] = []

  // mutation
  @Mutation
  public setTasks (tasks: ITask[]) {
    this.tasks = tasks
  }

  @Mutation
  public setTaskHistories (taskHistories: ITaskHistory[]) {
    this.taskHistories = taskHistories
  }

   @Mutation
  public setCategories (categories: ICategory[]) {
    this.categories = categories
  }

  // actions
  @Action
   public updateTasks (tasks: ITask[]) {
     this.setTasks(tasks)
   }

  @Action
  public updateTaskHistories (taskHistories: ITaskHistory[]) {
    this.setTaskHistories(taskHistories)
  }

  @Action
  public updateCategories (categories: ICategory[]) {
    this.setCategories(categories)
  }
}
