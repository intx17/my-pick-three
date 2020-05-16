export interface IPanel {
  categories: string[],
  tasks: IPanelTask[]
}

interface IPanelTask {
  taskName: string
}
