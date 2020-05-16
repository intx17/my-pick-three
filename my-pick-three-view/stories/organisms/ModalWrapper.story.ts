import { storiesOf } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'
import { withKnobs, boolean } from '@storybook/addon-knobs'
import ModalWrapper from '~/components/organisms/ModalWrapper.vue'

const modalContent = '<div style="width: 200px; height: 200px; background-color: white;">modal content</div>'

storiesOf('organisms', module)
  .addDecorator(withKnobs)
  .addDecorator(withInfo({ inline: true }))
  .add(
    'ModalWrapper',
    () => {
      return {
        components: { ModalWrapper },
        template: '<ModalWrapper :is-active.sync="isActive"><p style="width: 200px; height: 200px; background-color: white;">modal content</p></ModalWrapper>',
        props: {
          isActive: {
            type: Boolean,
            default: boolean('isActive', true)
          }
        }
      }
    })
