// components interface
import { ISelectOption } from '~/src/components/atoms/select-dropdown'

enum TaskCategory {
  Eating = 1
}

class TaskCategoryUtil {
  private static textMap = new Map<TaskCategory, string>(
    [
      [TaskCategory.Eating, '食事']
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
