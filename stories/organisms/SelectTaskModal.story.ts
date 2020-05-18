import { storiesOf } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'
import { withKnobs, boolean } from '@storybook/addon-knobs'
import SelectTaskModal from '~/components/organisms/SelectTaskModal.vue'
import { IPanelItem } from '~/src/components/atoms/panel'
import ICategory from '~/src/entities/category'

const panelCategories: ICategory[] = [
  {
    categoryCode: 1,
    categoryName: 'cat1'
  },
  {
    categoryCode: 2,
    categoryName: 'cat2'
  }
]

const panelItems: IPanelItem[] = [
  {
    categoryCode: 1,
    itemId: 'id1',
    itemName: 'One'
  },
  {
    categoryCode: 2,
    itemId: 'id2',
    itemName: 'Two'
  },
  {
    categoryCode: 3,
    itemId: 'id3',
    itemName: 'Three'
  },
  {
    categoryCode: 4,
    itemId: 'id4',
    itemName: 'Four'
  }
]

storiesOf('organisms', module)
  .addDecorator(withKnobs)
  .addDecorator(withInfo({ inline: true }))
  .add(
    'SelectTaskModal',
    () => {
      return {
        components: {
          SelectTaskModal: {
            extends: SelectTaskModal,
            computed: {
              panelCategories () {
                return panelCategories
              },
              panelItems () {
                return panelItems
              }
            }
          }
        },
        template: '<SelectTaskModal :is-select-modal-open.sync="isSelectModalOpen" />',
        props: {
          isSelectModalOpen: {
            type: Boolean,
            default: boolean('isSelectModalOpen', true)
          }
        }
      }
    })
