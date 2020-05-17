import { Mutation, Action, VuexModule, Module } from 'vuex-module-decorators'
import { IPanelItem } from '~/src/components/atoms/panel'

// state's interface
export interface ISelectTaskModalStore {
  panelItems: IPanelItem[]
}

@Module({
  name: 'select-task-modal',
  namespaced: true,
  stateFactory: true
})
export default class SelectTaskModal extends VuexModule implements ISelectTaskModalStore {
  // state
  panelItems: IPanelItem[] = []

  // mutation
  @Mutation
  public setPanelItems (items: IPanelItem[]) {
    this.panelItems = items
  }

  // actions

  @Action
  public updatePanelItems (items: IPanelItem[]) {
    this.setPanelItems(items)
  }
}
