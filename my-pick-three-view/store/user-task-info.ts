import { Mutation, Action, VuexModule, Module } from 'vuex-module-decorators'
import ITask from '~/src/entities/task'
import ITaskHistory from '~/src/entities/task-history'

// state's interface
export interface IUserTaskInfoStore {
  tasks: ITask[]
  taskHistories: ITaskHistory[]
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

  // mutation
  @Mutation
  public setTasks (tasks: ITask[]) {
    this.tasks = tasks
  }

  @Mutation
  public setTaskHistories (taskHistories: ITaskHistory[]) {
    this.taskHistories = taskHistories
  }

  // actions
  @Action
  public updateTasks (tasks: ITask[]) {
    this.setTasks(tasks)
  }

  // actions
  @Action
  public updateTaskHistories (taskHistories: ITaskHistory[]) {
    this.setTaskHistories(taskHistories)
  }
}
