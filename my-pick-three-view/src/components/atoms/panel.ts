import { TaskCategory } from '~/src/enums/task-category'

export interface IPanelItem {
  category: TaskCategory,
  itemId: string
  itemName: string
}
