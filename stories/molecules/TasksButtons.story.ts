import { storiesOf } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'
import { withKnobs } from '@storybook/addon-knobs'

// components
import TaskButtons from '~/components/molecules/TaskButtons.vue'

storiesOf('molecules', module)
  .addDecorator(withKnobs)
  .addDecorator(withInfo({ inline: true }))
  .add(
    'TaskButtons',
    () => {
      return {
        components: { TaskButtons },
        template: '<TaskButtons />'
      }
    })
