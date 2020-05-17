import { storiesOf } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'
import { withKnobs, text } from '@storybook/addon-knobs'
import TextareaWithLabel from '~/components/atoms/TextareaWithLabel.vue'

storiesOf('atoms', module)
  .addDecorator(withKnobs)
  .addDecorator(withInfo({ inline: true }))
  .add(
    'TextareaWithLabel',
    () => {
      return {
        components: { TextareaWithLabel },
        template: '<TextareaWithLabel :labelText="labelText" :text.sync="syncedValue" />',
        props: {
          labelText: {
            type: String,
            default: text('テキスト', 'text')
          },
          syncedText: {
            type: String,
            default: text('text', 'text'.repeat(3))
          }
        }
      }
    })
