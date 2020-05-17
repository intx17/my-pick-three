import { storiesOf } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'
import { withKnobs, boolean } from '@storybook/addon-knobs'
import EditTaskModal from '~/components/organisms/EditTaskModal.vue'

storiesOf('organisms', module)
  .addDecorator(withKnobs)
  .addDecorator(withInfo({ inline: true }))
  .add(
    'EditTaskModal',
    () => {
      return {
        components: { EditTaskModal },
        template: '<EditTaskModal :is-edit-modal-open.sync="isEditModalOpen" />',
        props: {
          isEditModalOpen: {
            type: Boolean,
            default: boolean('isEditModalOpen', true)
          }
        }
      }
    })
