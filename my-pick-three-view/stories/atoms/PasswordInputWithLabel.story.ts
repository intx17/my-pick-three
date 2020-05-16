import { storiesOf } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'
import { withKnobs, text } from '@storybook/addon-knobs'
import PasswordInputWithLabel from '@/components/atoms/PasswordInputWithLabel.vue'

storiesOf('atoms', module)
  .addDecorator(withKnobs)
  .addDecorator(withInfo({ inline: true }))
  .add(
    'PasswordInputWithLabel',
    () => {
      return {
        components: { PasswordInputWithLabel },
        template: '<PasswordInputWithLabel :labelText="labelText" :value.sync="syncedValue" />',
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
