import { storiesOf } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'
import { withKnobs } from '@storybook/addon-knobs'
import Navbar from '@/components/organisms/Navbar.vue'

storiesOf('organisms', module)
  .addDecorator(withKnobs)
  .addDecorator(withInfo({ inline: true }))
  .add(
    'Navbar',
    () => {
      return {
        components: { Navbar },
        template: '<Navbar />'
      }
    })
