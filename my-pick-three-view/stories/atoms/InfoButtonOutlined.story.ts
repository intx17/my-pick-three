import { storiesOf } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'
import { withKnobs, text } from '@storybook/addon-knobs'
import InfoButtonOutlined from '~/components/atoms/InfoButtonOutlined.vue'

storiesOf('atoms', module)
  .addDecorator(withKnobs)
  .addDecorator(withInfo({ inline: true }))
  .add(
    'InfoButtonOutlined',
    () => {
      return {
        components: { InfoButtonOutlined },
        template: '<InfoButtonOutlined :buttonText="buttonText" />',
        props: {
          buttonText: {
            type: String,
            default: text('buttonText', 'text')
          }
        }
      }
    })
