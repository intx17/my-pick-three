import { storiesOf } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'
import { withKnobs } from '@storybook/addon-knobs'
import LoginForm from '@/components/organisms/LoginForm.vue'

storiesOf('organisms', module)
  .addDecorator(withKnobs)
  .addDecorator(withInfo({ inline: true }))
  .add(
    'LoginForm',
    () => {
      return {
        components: { LoginForm },
        template: '<LoginForm />'
      }
    })
