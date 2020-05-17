import { storiesOf } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'
import { withKnobs, boolean } from '@storybook/addon-knobs'
import SelectTaskModal from '~/components/organisms/SelectTaskModal.vue'

storiesOf('organisms', module)
  .addDecorator(withKnobs)
  .addDecorator(withInfo({ inline: true }))
  .add(
    'SelectTaskModal',
    () => {
      return {
        components: { SelectTaskModal },
        template: '<SelectTaskModal :is-select-modal-open.sync="isSelectModalOpen" />',
        props: {
          isSelectModalOpen: {
            type: Boolean,
            default: boolean('isSelectModalOpen', true)
          }
        }
      }
    })
