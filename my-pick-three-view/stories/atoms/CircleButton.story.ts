import { storiesOf } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'
import { withKnobs, text as knobsText } from '@storybook/addon-knobs'
import CircleButton from '~/components/atoms/CircleButton.vue'

storiesOf('atoms', module)
  .addDecorator(withKnobs)
  .addDecorator(withInfo({ inline: true }))
  .add(
    'CircleButton',
    () => ({
      components: { CircleButton },
      template: '<CircleButton :text="text" />',
      props: {
        text: {
          type: String,
          default: knobsText('テキスト', 'text')
        }
      }
    }))
