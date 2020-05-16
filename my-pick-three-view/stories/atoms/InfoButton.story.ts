import { storiesOf } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'
import { withKnobs, text } from '@storybook/addon-knobs'
import InfoButton from '~/components/atoms/InfoButton.vue'

storiesOf('atoms', module)
  .addDecorator(withKnobs)
  .addDecorator(withInfo({ inline: true }))
  .add(
    'InfoButton',
    () => {
      return {
        components: { InfoButton },
        template: '<InfoButton :buttonText="buttonText" />',
        props: {
          buttonText: {
            type: String,
            default: text('buttonText', 'text')
          }
        }
      }
    })
