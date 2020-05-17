import { Mutation, Action, VuexModule, Module } from 'vuex-module-decorators'
import { IPanelItem } from '~/src/components/atoms/panel'
import ICategory from '~/src/entities/category'

// state's interface
export interface ISelectTaskModalStore {
  panelCategories: ICategory[],
  panelItems: IPanelItem[]
}

@Module({
  name: 'select-task-modal',
  namespaced: true,
  stateFactory: true
})
export default class SelectTaskModal extends VuexModule implements ISelectTaskModalStore {
  // state
  panelCategories: ICategory[] = []
  panelItems: IPanelItem[] = []

  // mutation
  @Mutation
  public setPanelCategories (categories: ICategory[]) {
    this.panelCategories = categories
  }

  @Mutation
  public setPanelItems (items: IPanelItem[]) {
    this.panelItems = items
  }

  // actions
  @Action
  public updatePanelCategories (categories: ICategory[]) {
    this.setPanelCategories(categories)
  }

  @Action
  public updatePanelItems (items: IPanelItem[]) {
    this.setPanelItems(items)
  }
}
