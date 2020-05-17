import { storiesOf } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'
import { withKnobs, boolean } from '@storybook/addon-knobs'
import EditTaskModal from '~/components/organisms/EditTaskModal.vue'
import { ISelectOption } from '~/src/components/atoms/select-dropdown'

const options: ISelectOption[] = [
  {
    text: 'text1',
    value: 'value1'
  },
  {
    text: 'text2',
    value: 'value2'
  }
]

storiesOf('organisms', module)
  .addDecorator(withKnobs)
  .addDecorator(withInfo({ inline: true }))
  .add(
    'EditTaskModal',
    () => {
      return {
        components: {
          EditTaskModal: {
            extends: EditTaskModal,
            computed: {
              selectOptions () {
                return options
              }
            }
          }
        },
        template: '<EditTaskModal :is-edit-modal-open.sync="isEditModalOpen" />',
        props: {
          isEditModalOpen: {
            type: Boolean,
            default: boolean('isEditModalOpen', true)
          }
        }
      }
    })
