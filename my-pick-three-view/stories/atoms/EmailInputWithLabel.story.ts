import { storiesOf } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'
import { withKnobs, text } from '@storybook/addon-knobs'
import EmailInputWithLabel from '~/components/atoms/EmailInputWithLabel.vue'

storiesOf('atoms', module)
  .addDecorator(withKnobs)
  .addDecorator(withInfo({ inline: true }))
  .add(
    'EmailInputWithLabel',
    () => {
      return {
        components: { EmailInputWithLabel },
        template: '<EmailInputWithLabel :labelText="labelText" :value.sync="syncedValue" />',
        props: {
          labelText: {
            type: String,
            default: text('テキスト', 'text')
          },
          syncedValue: {
            type: String,
            default: text('input値', 'value')
          }
        }
      }
    })
