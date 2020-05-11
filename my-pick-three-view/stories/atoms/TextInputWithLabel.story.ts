import { storiesOf } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'
import { withKnobs, text } from '@storybook/addon-knobs'
import TextInputWithLabel from '@/components/atoms/TextInputWithLabel.vue'

storiesOf('atoms', module)
  .addDecorator(withKnobs)
  .addDecorator(withInfo({ inline: true }))
  .add(
    'TextWithLabel',
    () => {
      return {
        components: { TextInputWithLabel },
        template: '<TextInputWithLabel :labelText="labelText" :value.sync="syncedValue" />',
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
