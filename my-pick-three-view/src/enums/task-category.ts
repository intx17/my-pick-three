// components interface
import { ISelectOption } from '~/src/components/atoms/select-dropdown'

enum TaskCategory {
  All = 0,
  Eating = 1,
  Exercise = 2
}

class TaskCategoryUtil {
  private static textMap = new Map<TaskCategory, string>(
    [
      [TaskCategory.All, '全て'],
      [TaskCategory.Eating, '食事'],
      [TaskCategory.Exercise, '運動']
    ]
  )

  public static getSelectOptions (): ISelectOption[] {
    const options: ISelectOption[] = []
    TaskCategoryUtil.textMap
      .forEach((value: string, key: TaskCategory) => {
        const option: ISelectOption = {
          text: value,
          value: String(key)
        }
        options.push(option)
      })
    return options
  }
}

export { TaskCategory, TaskCategoryUtil }
